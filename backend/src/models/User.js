import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // ── Signup fields — DO NOT CHANGE ──────────────────────────────
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        // ── Profile fields — optional, filled in later from /settings ──
        firstName: {
            type: String,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        avatar: {
            type: String, // URL to uploaded image (Cloudinary/S3/local static path)
            default: "",
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        taxIdNumber: {
            type: String,
            trim: true,
        },

        taxIdCountry: {
            type: String,
            trim: true,
            default: "India",
        },

        studio: {
            type: String, // shop/studio name, e.g. "Meera's Craft"
            trim: true,
        },

        address: {
            type: String, // "Street, city, state" as one field per your UI
            trim: true,
        },

        // ── Notification / verification toggles (seen in sidebar tabs) ─
        notificationPrefs: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false },
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        // ── True dynamic bucket ─────────────────────────────────────────
        // Anything you add to the profile UI later that doesn't deserve
        // its own named field yet can go here without a migration.
        // Stored in Mongo as a nested object; Mongoose exposes it as a Map.
        additionalInfo: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;