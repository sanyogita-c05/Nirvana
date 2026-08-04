import Product from "../models/Product.js";
import Notification from "../models/Notification.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateSequence from "../utils/generateSequence.js";
import Order from "../models/Order.js";

const LOW_STOCK_THRESHOLD = 5;

const maybeCreateLowStockNotification = async (product, ownerId) => {
    if (product.stockQuantity >= LOW_STOCK_THRESHOLD) return;

    const existing = await Notification.findOne({
        owner: ownerId,
        type: "low_stock",
        relatedProduct: product._id,
        isRead: false,
    });

    if (existing) return;

    await Notification.create({
        owner: ownerId,
        type: "low_stock",
        icon: "AlertTriangle",
        title: "Low stock alert",
        tag: "Info",
        category: "Inventory",
        message: `${product.name} has only ${product.stockQuantity} unit${product.stockQuantity === 1 ? "" : "s"} left. Restock soon.`,
        relatedProduct: product._id,
    });
};

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

    const imageFiles = Array.isArray(req.files)
        ? req.files
        : req.file
            ? [req.file]
            : [];

    const imagePath = imageFiles.length
        ? `/uploads/products/${imageFiles[0].filename}`
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

    await maybeCreateLowStockNotification(product, req.user._id);

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

    const imageFiles = Array.isArray(req.files)
        ? req.files
        : req.file
            ? [req.file]
            : [];

    if (imageFiles.length) {
        product.imagePath = `/uploads/products/${imageFiles[0].filename}`;
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

/*
----------------------------------------
Get Low Stock Products (stock < 5)
----------------------------------------
*/

export const getLowStockProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({
        owner: req.user._id,
        isActive: true,
        stockQuantity: { $lt: 5 },
    }).sort({ stockQuantity: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Low stock products fetched successfully."
        )
    );
});

/*
----------------------------------------
Get Top 4 Selling Products (by units sold)
----------------------------------------
*/

export const getTopSellingProducts = asyncHandler(async (req, res) => {

    const topProducts = await Order.aggregate([
        { $match: { owner: req.user._id, isActive: true } },
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.productId",
                name: { $first: "$items.name" },
                totalSold: { $sum: "$items.quantity" },
                totalRevenue: { $sum: "$items.lineTotal" },
            },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 4 },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            topProducts,
            "Top selling products fetched successfully."
        )
    );
});