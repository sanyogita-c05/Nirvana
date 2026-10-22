import jwt from "jsonwebtoken";
import License from "../models/license.js";
import { encryptValue, decryptValue } from "./licenseCrypto.js";
import { writeInstallBackup, readInstallBackup } from "./licenseBackup.js";
import getDeviceFingerprint from "./deviceFingerprint.js";
import LICENSE_PUBLIC_KEY from "../config/licensePublicKey.js";

/* ------------------------------------------------------------------
   Policy constants - the ONLY place these live.
------------------------------------------------------------------ */
export const TRIAL_DAYS = 30;

const LICENSE_ID = "app-license";
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Clock may jump back this far (NTP corrections, parallel requests)
// without being treated as tampering.
const CLOCK_TOLERANCE_MS = 5 * 60 * 1000;

// lastSeen is only rewritten this often, instead of on every request.
const LAST_SEEN_WRITE_INTERVAL_MS = 60 * 1000;

// Issuer and customer clocks differ slightly; allow a day of slack.
const NOT_YET_VALID_TOLERANCE_MS = MS_PER_DAY;

// If the stored trial/clock blobs can no longer be decrypted (new
// hardware, reinstalled OS, changed APP_SECRET) AND the customer holds
// a valid signed license, re-create the blobs instead of locking out a
// paying customer.
// Trade-off: a licensed user who deliberately corrupts lastSeenBlob can
// reset the clock-rollback floor. Set to false to prefer strictness.
const ALLOW_LICENSED_RESEAL = true;

// Trusted public keys by `kid`. Add a new entry when you rotate keys;
// tokens without a known kid are verified against "default".
const PUBLIC_KEYS = { default: LICENSE_PUBLIC_KEY };

const KEY_FAILURES = {
    INVALID: {
        state: "license_invalid",
        code: "LICENSE_INVALID",
        message: "License key is invalid or corrupted. Please contact support.",
    },
    WRONG_DEVICE: {
        state: "license_wrong_device",
        code: "LICENSE_WRONG_DEVICE",
        message:
            "This license was issued for a different computer. Please request a license for this device.",
    },
    NOT_YET_VALID: {
        state: "license_not_yet_valid",
        code: "LICENSE_NOT_YET_VALID",
        message: "This license is not valid yet. Please check your system date.",
    },
};

/* ------------------------------------------------------------------
   Token inspection (pure: no database access)
------------------------------------------------------------------ */
export function inspectLicenseKey(token, now = new Date()) {
    let payload;

    try {
        const decoded = jwt.decode(token, { complete: true });
        if (!decoded) return { ok: false, reason: "INVALID" };

        const key = PUBLIC_KEYS[decoded.header.kid] ?? PUBLIC_KEYS.default;
        payload = jwt.verify(token, key, { algorithms: ["RS256"] });
    } catch {
        return { ok: false, reason: "INVALID" };
    }

    const validUntil = new Date(payload.validUntil);
    if (Number.isNaN(validUntil.getTime())) {
        return { ok: false, reason: "INVALID" };
    }

    // Device-bound license (new tokens). Legacy tokens have no deviceId.
    if (payload.deviceId && payload.deviceId !== getDeviceFingerprint()) {
        return { ok: false, reason: "WRONG_DEVICE", payload };
    }

    if (payload.validFrom) {
        const validFrom = new Date(payload.validFrom);
        if (
            !Number.isNaN(validFrom.getTime()) &&
            now.getTime() < validFrom.getTime() - NOT_YET_VALID_TOLERANCE_MS
        ) {
            return { ok: false, reason: "NOT_YET_VALID", payload };
        }
    }

    const graceMs = Math.max(0, Number(payload.graceDays) || 0) * MS_PER_DAY;
    const graceEndsAt = new Date(validUntil.getTime() + graceMs);
    const expired = now.getTime() >= validUntil.getTime();

    return {
        ok: true,
        payload,
        validUntil,
        graceEndsAt,
        expired,
        inGrace: expired && now.getTime() < graceEndsAt.getTime(),
        customer: payload.customerId ?? payload.licenseId ?? null,
        jti: payload.jti ?? null,
    };
}

/* ------------------------------------------------------------------
   License document lifecycle
------------------------------------------------------------------ */
const safeWriteBackup = (installIso) => {
    try {
        writeInstallBackup(installIso);
    } catch (err) {
        console.error("[license] could not write install backup:", err.message);
    }
};

export async function loadOrCreateLicense(now = new Date()) {
    const existing = await License.findById(LICENSE_ID);
    if (existing) return existing;

    // First run, or the document was deleted. The encrypted backup file
    // preserves the original install date.
    let installDate = now;
    const backedUp = readInstallBackup();
    if (backedUp) {
        const parsed = new Date(backedUp);
        if (!Number.isNaN(parsed.getTime())) {
            installDate = parsed.getTime() > now.getTime() ? now : parsed;
        }
    }
    const installIso = installDate.toISOString();

    try {
        const created = await License.create({
            _id: LICENSE_ID,
            installBlob: encryptValue(installIso),
            lastSeenBlob: encryptValue(now.toISOString()),
        });
        safeWriteBackup(installIso);
        return created;
    } catch (err) {
        // Two first requests raced; the other one created it.
        if (err?.code === 11000) return License.findById(LICENSE_ID);
        throw err;
    }
}

// Installs created before the backup file existed never got one.
// Check once per process and write it if missing.
let backupChecked = false;
function ensureBackup(license) {
    if (backupChecked) return;
    backupChecked = true;
    try {
        if (readInstallBackup() === null) {
            safeWriteBackup(decryptValue(license.installBlob));
        }
    } catch {
        /* blob unreadable - nothing to back up */
    }
}

/* ------------------------------------------------------------------
   Main entry point: should this installation be allowed to run?
   Returns { allowed, state, code, message, activated, ... }
------------------------------------------------------------------ */
const decision = (allowed, state, code, message, extra = {}) => ({
    allowed,
    state,
    code,
    message,
    activated: false,
    ...extra,
});

export async function evaluateLicense({ now = new Date(), touch = false } = {}) {
    const license = await loadOrCreateLicense(now);
    ensureBackup(license);

    const keyInfo = license.licenseKey
        ? inspectLicenseKey(license.licenseKey, now)
        : null;
    const keyUsable = Boolean(
        keyInfo?.ok && (!keyInfo.expired || keyInfo.inGrace)
    );

    /* ---- 1. Unseal stored clocks ---- */
    let installDate;
    let lastSeenDate;

    try {
        installDate = new Date(decryptValue(license.installBlob));
        lastSeenDate = new Date(decryptValue(license.lastSeenBlob));
        if (
            Number.isNaN(installDate.getTime()) ||
            Number.isNaN(lastSeenDate.getTime())
        ) {
            throw new Error("invalid stored date");
        }
    } catch {
        if (!(ALLOW_LICENSED_RESEAL && keyUsable)) {
            return decision(
                false,
                "verification_failed",
                "LICENSE_VERIFICATION_FAILED",
                "License verification failed. Please contact support."
            );
        }

        // Licensed customer on changed hardware / secret: rebuild the
        // blobs. The install date becomes the license issue date so
        // this cannot hand out a brand-new trial later.
        const issuedMs = keyInfo.payload.iat
            ? keyInfo.payload.iat * 1000
            : now.getTime();
        installDate = new Date(Math.min(issuedMs, now.getTime()));
        lastSeenDate = now;

        license.installBlob = encryptValue(installDate.toISOString());
        license.lastSeenBlob = encryptValue(now.toISOString());
        await license.save();
        safeWriteBackup(installDate.toISOString());
    }

    /* ---- 2. Clock-rollback check (with tolerance) ---- */
    if (now.getTime() < lastSeenDate.getTime() - CLOCK_TOLERANCE_MS) {
        return decision(
            false,
            "clock_tampered",
            "CLOCK_TAMPERED",
            "System clock appears to have been changed. Please correct your system time."
        );
    }

    if (
        touch &&
        now.getTime() - lastSeenDate.getTime() >= LAST_SEEN_WRITE_INTERVAL_MS
    ) {
        license.lastSeenBlob = encryptValue(now.toISOString());
        await license.save();
    }

    /* ---- 3. Paid license (no fallback to trial once a key is stored) ---- */
    if (keyInfo) {
        if (!keyInfo.ok) {
            const f = KEY_FAILURES[keyInfo.reason];
            return decision(false, f.state, f.code, f.message);
        }

        const extra = {
            activated: true,
            validUntil: keyInfo.validUntil.toISOString(),
            graceEndsAt:
                keyInfo.graceEndsAt > keyInfo.validUntil
                    ? keyInfo.graceEndsAt.toISOString()
                    : undefined,
        };

        if (!keyInfo.expired) {
            return decision(true, "licensed", "LICENSED", "License active.", extra);
        }

        if (keyInfo.inGrace) {
            return decision(
                true,
                "grace",
                "LICENSE_GRACE",
                `Your subscription expired on ${keyInfo.validUntil.toDateString()}. Please renew before ${keyInfo.graceEndsAt.toDateString()}.`,
                extra
            );
        }

        return decision(
            false,
            "license_expired",
            "LICENSE_EXPIRED",
            "Your subscription has expired. Please renew to continue.",
            extra
        );
    }

    /* ---- 4. Trial ---- */
    const daysSinceInstall = Math.max(
        0,
        (now.getTime() - installDate.getTime()) / MS_PER_DAY
    );

    if (daysSinceInstall < TRIAL_DAYS) {
        return decision(true, "trial", "TRIAL_ACTIVE", "Free trial active.", {
            trialDaysLeft: Math.ceil(TRIAL_DAYS - daysSinceInstall),
        });
    }

    return decision(
        false,
        "trial_expired",
        "TRIAL_EXPIRED",
        `Your ${TRIAL_DAYS}-day free trial has ended. Please subscribe to continue.`,
        { trialDaysLeft: 0, trialExpired: true }
    );
}
