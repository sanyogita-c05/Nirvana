import mongoose from "mongoose";

// icon/tag/category are stored (not computed on the frontend) so that
// NotificationCard/Notifications.jsx can render directly from the API
// response without a mapping layer — trade-off: less flexible if you
// rename categories later, but simpler wiring for now.
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
            enum: ["low_stock", "new_order"], // extend as more triggers are built
            required: true,
            index: true,
        },

        icon: {
            type: String, // matches a key in Notifications.jsx's ICONS map
            enum: ["Package", "CheckCircle2", "Star", "AlertTriangle", "Truck"],
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        tag: {
            type: String,
            enum: ["Urgent", "New", "Info"],
            default: "Info",
        },

        category: {
            type: String,
            enum: ["Orders", "Payments", "Reviews", "Shipping", "Inventory"],
            required: true,
        },

        relatedProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },

        relatedOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },

        isRead: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;