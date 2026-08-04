import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
            default: "general",
        },
        icon: {
            type: String,
            trim: true,
            default: "Info",
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        tag: {
            type: String,
            trim: true,
            default: "Info",
        },
        category: {
            type: String,
            trim: true,
            default: "General",
        },
        message: {
            type: String,
            trim: true,
            required: true,
        },
        relatedProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
