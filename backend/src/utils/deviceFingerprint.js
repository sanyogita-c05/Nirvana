import crypto from "crypto";
import fs from "fs";
import os from "os";
import { execFileSync } from "child_process";

/*
 * Stable device fingerprint.
 *
 * Uses the machine ID the operating system assigns at install time.
 * Unlike hostname / RAM / CPU, it does not change when the PC is
 * renamed or upgraded; it only changes on an OS reinstall or a new
 * machine, which is exactly when a license transfer is appropriate.
 *
 * The raw ID is salted and hashed, so the value shown in
 * /api/license/status is not the real machine GUID.
 */

const SALT = "artisansuite-device-v1";

let cached = null;

const readMachineId = () => {
    try {
        if (process.platform === "win32") {
            const out = execFileSync(
                "reg",
                ["query", "HKLM\\SOFTWARE\\Microsoft\\Cryptography", "/v", "MachineGuid"],
                { encoding: "utf8", windowsHide: true }
            );
            const match = out.match(/MachineGuid\s+REG_SZ\s+(\S+)/i);
            if (match) return match[1];
        } else if (process.platform === "darwin") {
            const out = execFileSync(
                "ioreg",
                ["-rd1", "-c", "IOPlatformExpertDevice"],
                { encoding: "utf8" }
            );
            const match = out.match(/"IOPlatformUUID" = "([^"]+)"/);
            if (match) return match[1];
        } else {
            for (const file of ["/etc/machine-id", "/var/lib/dbus/machine-id"]) {
                if (fs.existsSync(file)) {
                    const id = fs.readFileSync(file, "utf8").trim();
                    if (id) return id;
                }
            }
        }
    } catch {
        /* fall through to fallback */
    }
    return null;
};

const getDeviceFingerprint = () => {
    if (cached) return cached;

    let machineId = readMachineId();

    if (!machineId) {
        console.warn(
            "[license] Could not read the OS machine ID; using a less stable fallback fingerprint."
        );
        machineId = `fallback:${os.hostname()}:${os.platform()}:${os.arch()}`;
    }

    cached = crypto
        .createHash("sha256")
        .update(`${SALT}:${machineId}`)
        .digest("hex");

    return cached;
};

export default getDeviceFingerprint;