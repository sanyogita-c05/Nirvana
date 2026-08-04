import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
    clearAllNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/mark-all-read", protect, markAllRead);
router.delete("/clear-all", protect, clearAllNotifications);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteNotification);

export default router;
