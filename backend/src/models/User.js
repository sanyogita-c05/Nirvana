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
            match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                "Please enter a valid email address",
            ],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
            match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6, // NOTE: only checks the hash length at save time, see auth.controller.js register() for real strength validation on the plaintext password
        },

        // ── Profile fields — optional, filled in later from /settings ──
        firstName: {
            type: String,
            trim: true,
            maxlength: [50, "First name cannot exceed 50 characters"],
        },

        lastName: {
            type: String,
            trim: true,
            maxlength: [50, "Last name cannot exceed 50 characters"],
        },

        avatar: {
            type: String, // path/URL to the uploaded photo, set by the upload endpoint
            default: "",
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        taxIdNumber: {
            type: String,
            trim: true,
            maxlength: [30, "Tax identification number looks too long"],
        },

        taxIdCountry: {
            type: String,
            trim: true,
            default: "India",
            maxlength: [56, "Country name looks too long"], // 56 = longest official country name
        },

        studio: {
            type: String, // shop/studio name, e.g. "Meera's Craft"
            trim: true,
            maxlength: [100, "Studio name cannot exceed 100 characters"],
        },

        address: {
            type: String, // "Street, city, state" as one field per your UI
            trim: true,
            maxlength: [300, "Address cannot exceed 300 characters"],
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