import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { encryptValue, decryptValue } from "./licenseCrypto.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lives at back-end/.license-lock.json — outside the "src" tree so it
// survives a code redeploy. Stored encrypted (not just signed), so
// deleting the Mongo "license" document alone cannot reset the trial;
// this file is consulted as the fallback source of truth.
const BACKUP_PATH = path.resolve(__dirname, "../../.license-lock.json");

export const writeInstallBackup = (installDateIso) => {
    const blob = encryptValue(installDateIso);
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(blob), "utf-8");
};

export const readInstallBackup = () => {
    if (!fs.existsSync(BACKUP_PATH)) return null;

    try {
        const blob = JSON.parse(fs.readFileSync(BACKUP_PATH, "utf-8"));
        return decryptValue(blob);
    } catch {
        // Tampered, corrupted, or created on a different machine.
        return null;
    }
};