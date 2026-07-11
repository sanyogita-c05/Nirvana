import Product from "../models/Product.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateSequence from "../utils/generateSequence.js";

/*
----------------------------------------
Create Product
----------------------------------------
*/

export const createProduct = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        category,
        costPrice,
        sellingPrice,
        stockQuantity,
    } = req.body;

    if (
        !name ||
        !category ||
        costPrice === undefined ||
        sellingPrice === undefined ||
        stockQuantity === undefined
    ) {
        throw new ApiError(400, "Please fill all required fields.");
    }

    if (Number(costPrice) < 0)
        throw new ApiError(400, "Cost price cannot be negative.");

    if (Number(sellingPrice) < 0)
        throw new ApiError(400, "Selling price cannot be negative.");

    if (Number(stockQuantity) < 0)
        throw new ApiError(400, "Stock cannot be negative.");

    if (Number(sellingPrice) < Number(costPrice))
        throw new ApiError(
            400,
            "Selling price cannot be less than cost price."
        );

    // Image uploaded by Multer
    const imagePath = req.file
        ? `/uploads/products/${req.file.filename}`
        : "";

    if (!imagePath) {
        throw new ApiError(400, "Product image is required.");
    }

    // Generate SKU
    const sku = await generateSequence("product", "PRD");

    // Create Product
    const product = await Product.create({
        owner: req.user._id,
        sku,
        name,
        description,
        category,
        costPrice,
        sellingPrice,
        stockQuantity,
        imagePath,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            product,
            "Product created successfully."
        )
    );
});

/*
----------------------------------------
Get All Products
----------------------------------------
*/

export const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({
        owner: req.user._id,
        isActive: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully."
        )
    );
});

/*
----------------------------------------
Get Product By Id
----------------------------------------
*/

export const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findOne({
        _id: req.params.id,
        owner: req.user._id,
        isActive: true,
    });

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            product,
            "Product fetched successfully."
        )
    );
});

/*
----------------------------------------
Update Product
----------------------------------------
*/

export const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findOne({
        _id: req.params.id,
        owner: req.user._id,
        isActive: true,
    });

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    // Only these fields are allowed to update
    const allowedFields = [
        "name",
        "description",
        "category",
        "costPrice",
        "sellingPrice",
        "stockQuantity",
    ];

    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            product[field] = req.body[field];
        }
    });

    // Validations
    if (product.costPrice < 0) {
        throw new ApiError(400, "Cost price cannot be negative.");
    }

    if (product.sellingPrice < 0) {
        throw new ApiError(400, "Selling price cannot be negative.");
    }

    if (product.stockQuantity < 0) {
        throw new ApiError(400, "Stock cannot be negative.");
    }

    if (product.sellingPrice < product.costPrice) {
        throw new ApiError(
            400,
            "Selling price cannot be less than cost price."
        );
    }

    // Replace image if a new image is uploaded
    if (req.file) {
        product.imagePath = `/uploads/products/${req.file.filename}`;
    }

    await product.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            product,
            "Product updated successfully."
        )
    );
});

/*
----------------------------------------
Soft Delete Product
----------------------------------------
*/

export const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findOne({
        _id: req.params.id,
        owner: req.user._id,
        isActive: true,
    });

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    product.isActive = false;

    await product.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Product deleted successfully."
        )
    );
});