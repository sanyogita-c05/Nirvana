import express from "express";
import { activateLicense, getLicenseStatus } from "../controllers/license.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Must stay reachable even when locked out, otherwise the user can
// never see why, or submit a key to unlock the app.
router.get("/status", getLicenseStatus);
router.post("/activate", protect, activateLicense);

export default router;