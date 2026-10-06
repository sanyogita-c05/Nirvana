import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import licenseRoutes from "./routes/license.routes.js";
import checkLicense from "./middleware/checkLicense.middleware.js";

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

// Auth and license routes stay reachable even when the trial/subscription
// is expired — otherwise the user could never log in to see why they're
// locked out, or submit a license key to unlock the app.
app.use("/api/auth", authRoutes);
app.use("/api/license", licenseRoutes);

// Every route mounted below this line requires a valid trial window or
// an active license — checkLicense throws a 403 before reaching any of them.
app.use(checkLicense);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);

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