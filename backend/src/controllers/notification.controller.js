import Notification from "../models/Notification.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ owner: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched successfully."));
});

export const markAsRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findOne({ _id: req.params.id, owner: req.user._id });

    if (!notification) {
        throw new ApiError(404, "Notification not found.");
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json(new ApiResponse(200, notification, "Notification marked as read."));
});

export const markAllRead = asyncHandler(async (req, res) => {
    await Notification.updateMany({ owner: req.user._id, isRead: false }, { isRead: true });
    return res.status(200).json(new ApiResponse(200, null, "All notifications marked as read."));
});

export const clearAllNotifications = asyncHandler(async (req, res) => {
    await Notification.deleteMany({ owner: req.user._id });
    return res.status(200).json(new ApiResponse(200, null, "All notifications cleared."));
});

export const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findOne({ _id: req.params.id, owner: req.user._id });

    if (!notification) {
        throw new ApiError(404, "Notification not found.");
    }

    await notification.deleteOne();
    return res.status(200).json(new ApiResponse(200, null, "Notification deleted successfully."));
});
