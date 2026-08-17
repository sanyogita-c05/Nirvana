import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
    getDashboardStats,
    getRevenueChart,
    getWeeklyStats,
    getRevenueTrend,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/revenue-chart", protect, getRevenueChart);
router.get("/weekly-stats", protect, getWeeklyStats);
router.get("/revenue-trend", protect, getRevenueTrend);
// router.get("/traffic-sources", protect, getTrafficSources);

export default router;