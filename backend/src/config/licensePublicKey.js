import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LICENSE_PUBLIC_KEY = fs.readFileSync(
    path.join(__dirname, "license.public.pem"),
    "utf-8"
);

export default LICENSE_PUBLIC_KEY;