import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import { changePassword, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

export default router;