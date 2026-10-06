import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import getDeviceFingerprint from "../utils/deviceFingerprint.js";
import {
    evaluateLicense,
    inspectLicenseKey,
    loadOrCreateLicense,
} from "../utils/licenseService.js";

const ACTIVATION_ERRORS = {
    INVALID: "Invalid or corrupted license key.",
    WRONG_DEVICE:
        "This license was issued for a different computer. Send your Device ID to support to get a license for this machine.",
    NOT_YET_VALID:
        "This license is not valid yet. Please check that your system date is correct.",
};

/*
----------------------------------------
Activate License
(Route must be protected by your auth middleware - see notes.)
----------------------------------------
*/

export const activateLicense = asyncHandler(async (req, res) => {

    const licenseKey =
        typeof req.body.licenseKey === "string" ? req.body.licenseKey.trim() : "";

    if (!licenseKey) {
        throw new ApiError(400, "License key is required.");
    }

    const now = new Date();
    const incoming = inspectLicenseKey(licenseKey, now);

    if (!incoming.ok) {
        throw new ApiError(400, ACTIVATION_ERRORS[incoming.reason]);
    }

    if (incoming.expired) {
        throw new ApiError(400, "This license has already expired.");
    }

    // Creates the record if it does not exist yet (no more 500 here).
    const license = await loadOrCreateLicense(now);

    // Same key pasted twice: nothing to do.
    if (license.licenseKey === licenseKey) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { validUntil: incoming.payload.validUntil },
                "This license is already active."
            )
        );
    }

    // Never let a shorter or foreign key replace a working one.
    if (license.licenseKey) {
        const current = inspectLicenseKey(license.licenseKey, now);

        if (current.ok && !current.expired) {
            if (
                incoming.customer &&
                current.customer &&
                incoming.customer !== current.customer
            ) {
                throw new ApiError(
                    400,
                    "This license belongs to a different customer than the one currently active."
                );
            }

            if (incoming.validUntil.getTime() <= current.validUntil.getTime()) {
                throw new ApiError(
                    400,
                    `A license valid until ${current.validUntil.toDateString()} is already active. The new key does not extend it.`
                );
            }
        }
    }

    license.licenseKey = licenseKey;
    await license.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            { validUntil: incoming.payload.validUntil },
            "License activated successfully."
        )
    );
});

/*
----------------------------------------
Get License Status
(Keeps the existing response keys; adds state/code/message.
Never throws 403 - the lock screen needs this endpoint to work.)
----------------------------------------
*/

export const getLicenseStatus = asyncHandler(async (req, res) => {

    const status = await evaluateLicense({ touch: false });
    const deviceId = getDeviceFingerprint();

    const data = {
        activated: status.activated,
        valid: status.state === "licensed",
        allowed: status.allowed,
        state: status.state,
        code: status.code,
        message: status.message,
        validUntil: status.validUntil,
        graceEndsAt: status.graceEndsAt,
        trialDaysLeft: status.trialDaysLeft,
        trialExpired: status.trialExpired,
        deviceId,
    };

    return res
        .status(200)
        .json(new ApiResponse(200, data, "License status fetched."));
});