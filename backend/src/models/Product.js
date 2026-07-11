import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        sku: {
            type: String,
            unique: true,
            uppercase: true,
            trim: true,
            index: true,
        },

        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: 3,
            maxlength: 100,
            index: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            minlength: 2,
            maxlength: 50,
            index: true,
        },

        costPrice: {
            type: Number,
            required: true,
            min: [0, "Cost price cannot be negative"],
        },

        sellingPrice: {
            type: Number,
            required: true,
            min: [0, "Selling price cannot be negative"],
        },

        stockQuantity: {
            type: Number,
            required: true,
            min: [0, "Stock cannot be negative"],
            default: 0,
        },

        imagePath: {
            type: String,
            required: true,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;