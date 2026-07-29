import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getDashboardStats, getRevenueChart } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/revenue-chart", protect, getRevenueChart);

export default router;