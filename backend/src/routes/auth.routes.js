import express from "express";
import { register, login, changePassword, getMe, updateProfile, uploadAvatar, deleteAvatar } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import avatarUpload from "../middleware/avatarUpload.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);
router.put("/profile", protect, updateProfile);
router.post("/avatar", protect, avatarUpload.single("avatar"), uploadAvatar);
router.delete("/avatar", protect, deleteAvatar);

export default router;