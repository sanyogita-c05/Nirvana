import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {

    // 1. Read Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Not authorized. No token provided.");
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Find user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(401, "User not found.");
    }

    // 6. Attach user to request
    req.user = user;

    // 7. Move to next middleware/controller
    next();
});

export default protect;