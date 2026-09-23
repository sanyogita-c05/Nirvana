import path from "path";
import fs from "fs";

const dataDir = path.join(
    process.env.LOCALAPPDATA || process.cwd(),
    "ArtisanSuite",
    "data"
);

const uploadsDir = path.join(dataDir, "uploads");
const productsDir = path.join(uploadsDir, "products");
const avatarsDir = path.join(uploadsDir, "avatars");

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(avatarsDir, { recursive: true });

export { dataDir, uploadsDir, productsDir, avatarsDir };