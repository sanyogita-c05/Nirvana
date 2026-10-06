import crypto from "crypto";
import getDeviceFingerprint from "./deviceFingerprint.js";

const ALGORITHM = "aes-256-gcm";

// Derives a 32-byte AES key from the app secret + this machine's
// fingerprint, using scrypt (a proper key-derivation function, not a
// raw hash). Binding to the device means the encrypted trial record
// can only be decrypted on the machine it was created on.
const deriveKey = () => {
    const deviceId = getDeviceFingerprint();
    const material = `${process.env.APP_SECRET}:${deviceId}`;
    return crypto.scryptSync(material, "artisansuite-license-salt", 32);
};

export const encryptValue = (plainText) => {
    const key = deriveKey();
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    const encrypted = Buffer.concat([
        cipher.update(plainText, "utf-8"),
        cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString("base64"),
        tag: authTag.toString("base64"),
        data: encrypted.toString("base64"),
    };
};

// Throws if the blob was tampered with, or if it was encrypted on a
// different machine (since the derived key won't match).
export const decryptValue = (blob) => {
    const key = deriveKey();

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        key,
        Buffer.from(blob.iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(blob.tag, "base64"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(blob.data, "base64")),
        decipher.final(),
    ]);

    return decrypted.toString("utf-8");
};