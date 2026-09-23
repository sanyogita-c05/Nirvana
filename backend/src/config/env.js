import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { isSea } from "node:sea";

const isPackaged = isSea();

const configPath = isPackaged
    ? path.join(
        process.env.LOCALAPPDATA || process.cwd(),
        "ArtisanSuite",
        "data",
        "config.env"
    )
    : path.join(process.cwd(), ".env");

if (fs.existsSync(configPath)) {
    dotenv.config({ path: configPath });
} else {
    dotenv.config();
}

export default configPath;