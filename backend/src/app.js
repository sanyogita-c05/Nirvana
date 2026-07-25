import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

/*
------------------------------------
Middleware
------------------------------------
*/

// Enable CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images later)
app.use("/uploads", express.static("public/uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
/*
------------------------------------
Test Route
------------------------------------
*/

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ArtisanSuite Backend is Running "
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running"
    });
});

/*
------------------------------------
Global Error Handler
------------------------------------
*/

app.use(errorHandler);

export default app;