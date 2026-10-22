import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: "app-license",
        },

        installBlob: {
            iv: { type: String, required: true },
            tag: { type: String, required: true },
            data: { type: String, required: true },
        },

        lastSeenBlob: {
            iv: { type: String, required: true },
            tag: { type: String, required: true },
            data: { type: String, required: true },
        },

        // Raw signed license key string, if ever activated. Nothing
        // else about activation status is stored in plaintext — the
        // key itself is re-verified on every check, so there is no
        // boolean/date field here that could be hand-edited to fake
        // an active subscription.
        licenseKey: {
            type: String,
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const License = mongoose.model("License", licenseSchema);

export default License;