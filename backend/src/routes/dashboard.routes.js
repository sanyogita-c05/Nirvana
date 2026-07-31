import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getDashboardStats, getRevenueChart, getWeeklyStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/revenue-chart", protect, getRevenueChart);
router.get("/weekly-stats", protect, getWeeklyStats);

export default router;