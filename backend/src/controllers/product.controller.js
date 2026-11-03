import Product from "../models/Product.js";
import Notification from "../models/Notification.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateSequence from "../utils/generateSequence.js";
import Order from "../models/Order.js";

const LOW_STOCK_THRESHOLD = 5;

// Used when a product is created without any image
const DEFAULT_PRODUCT_IMAGE = {
    url: "/defaults/product-placeholder.png",
    originalName: "default",
};

// Creates a low-stock notification for this product, unless an unread
// one already exists — without this check, every small stock edit under
// the threshold would spawn a duplicate notification for the same item.
export const maybeCreateLowStockNotification = async (product, ownerId) => {
    if (product.stockQuantity > LOW_STOCK_THRESHOLD) return;

    // Out of stock gets its own notification, so it still shows up
    // even if an unread "low stock" one already exists for this product.
    const isOutOfStock = product.stockQuantity === 0;
    const type = isOutOfStock ? "out_of_stock" : "low_stock";

    const alreadyNotified = await Notification.findOne({
        owner: ownerId,
        type,
        relatedProduct: product._id,
        isRead: false,
    });

    if (alreadyNotified) return;

    await Notification.create({
        owner: ownerId,
        type,
        icon: "AlertTriangle",
        title: isOutOfStock ? "Out of stock" : "Low stock alert",
        tag: isOutOfStock ? "Urgent" : "Info",
        category: "Inventory",
        message: isOutOfStock
            ? `${product.name} is out of stock. Customers can't order it until you restock.`
            : `${product.name} has only ${product.stockQuantity} unit${product.stockQuantity === 1 ? "" : "s"
            } left. Restock soon to avoid missed orders.`,
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

    const trimmedName = name?.trim();
    const trimmedCategory = category?.trim();

    if (
        !trimmedName ||
        !trimmedCategory ||
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

    // Files uploaded by Multer via upload.fields([{name:"images"},{name:"video"}])
    const imageFiles = req.files?.images || [];
    const videoFiles = req.files?.video || [];

       // Image is optional — fall back to the default placeholder
    const images = imageFiles.length > 0
        ? imageFiles.map((file) => ({
            url: `/uploads/products/${req.productId}/${file.filename}`,
            originalName: file.originalname,
        }))
        : [DEFAULT_PRODUCT_IMAGE];

    const video = videoFiles[0]
        ? {
            url: `/uploads/products/${req.productId}/${videoFiles[0].filename}`,
            originalName: videoFiles[0].originalname,
        }
        : undefined;

    // Generate SKU
    const sku = await generateSequence("product", "PRD");

    // Create Product — _id explicitly set to the ID assignProductId
    // generated earlier, so it matches the upload folder name.
    const product = await Product.create({
        _id: req.productId,
        owner: req.user._id,
        sku,
        name: trimmedName,
        description,
        category: trimmedCategory,
        costPrice,
        sellingPrice,
        stockQuantity,
        images,
        video,
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

            product[field] =
                typeof req.body[field] === "string"
                    ? req.body[field].trim()
                    : req.body[field];
        }
    });

    if (!product.name) {
        throw new ApiError(400, "Product name is required.");
    }

    if (!product.category) {
        throw new ApiError(400, "Category is required.");
    }

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

    // New images are appended to the existing gallery (not replaced) —
    // removing a single image needs its own endpoint, not built yet.
    const newImageFiles = req.files?.images || [];

    if (newImageFiles.length > 0) {
        const newImages = newImageFiles.map((file) => ({
            url: `/uploads/products/${product._id}/${file.filename}`,
            originalName: file.originalname,
        }));

                // Drop the placeholder once real images are added
        const onlyDefault =
            product.images.length === 1 &&
            product.images[0].url === DEFAULT_PRODUCT_IMAGE.url;

        if (onlyDefault) {
            product.images = newImages;
        } else {
            product.images.push(...newImages);
        }
    }

    // A newly uploaded video replaces the old one — there's only one
    // video slot. Note: the old video file is NOT deleted from disk here.
    const newVideoFiles = req.files?.video || [];

    if (newVideoFiles.length > 0) {
        product.video = {
            url: `/uploads/products/${product._id}/${newVideoFiles[0].filename}`,
            originalName: newVideoFiles[0].originalname,
        };
    }

    await product.save();

    await maybeCreateLowStockNotification(product, req.user._id);

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
        stockQuantity: { $lte: LOW_STOCK_THRESHOLD },
    }).sort({ stockQuantity: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Low stock products fetched successfully."
        )
    );
});


// Shared by Top Selling and Least Ordered, so Least Ordered
// can skip whatever Top Selling already shows.
const topSellingPipeline = (ownerId) => [
    { $match: { owner: ownerId, isActive: true } },
    { $unwind: "$items" },
    {
        $group: {
            _id: "$items.productId",
            name: { $first: "$items.name" },
            totalSold: { $sum: "$items.quantity" },
            totalRevenue: { $sum: "$items.lineTotal" },
        },
    },
    // Hide products that were deleted (soft delete) after being ordered
    {
        $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
        },
    },
    { $match: { "product.isActive": true } },
    { $project: { product: 0 } },
      { $sort: { totalSold: -1, _id: 1 } },
    { $limit: 5 },
];
/*
----------------------------------------
Get Top 4 Selling Products (by units sold)
----------------------------------------
*/

export const getTopSellingProducts = asyncHandler(async (req, res) => {

    // const topProducts = await Order.aggregate([
    //     { $match: { owner: req.user._id, isActive: true } },
    //     { $unwind: "$items" },
    //     {
    //         $group: {
    //             _id: "$items.productId",
    //             name: { $first: "$items.name" },
    //             totalSold: { $sum: "$items.quantity" },
    //             totalRevenue: { $sum: "$items.lineTotal" },
    //         },
    //     },
    //     // Hide products that were deleted (soft delete) after being ordered
    //     {
    //         $lookup: {
    //             from: "products",
    //             localField: "_id",
    //             foreignField: "_id",
    //             as: "product",
    //         },
    //     },
    //     { $match: { "product.isActive": true } },
    //     { $project: { product: 0 } },
    //     { $sort: { totalSold: -1 } },
    //     { $limit: 5 },
    // ]);
        const topProducts = await Order.aggregate(topSellingPipeline(req.user._id));


    return res.status(200).json(
        new ApiResponse(
            200,
            topProducts,
            "Top selling products fetched successfully."
        )
    );
});

/*
----------------------------------------
Get 5 Least Ordered Products (by units sold)

Starts from Product (not Order) via $lookup, so products
with ZERO sales still show up — a pure mirror of
getTopSellingProducts (which starts from Order.aggregate)
would silently skip never-ordered products, since they
never appear in any order's items array.
----------------------------------------
*/

export const getLeastOrderedProducts = asyncHandler(async (req, res) => {

      const topSelling = await Order.aggregate(topSellingPipeline(req.user._id));
    const topSellingIds = topSelling.map((p) => p._id);

    const leastOrdered = await Product.aggregate([
        { $match: { owner: req.user._id, isActive: true, _id: { $nin: topSellingIds } } },
        {
            $lookup: {
                from: "orders",
                let: { productId: "$_id" },
                pipeline: [
                    { $match: { owner: req.user._id, isActive: true } },
                    { $unwind: "$items" },
                    { $match: { $expr: { $eq: ["$items.productId", "$$productId"] } } },
                    { $group: { _id: null, totalSold: { $sum: "$items.quantity" } } },
                ],
                as: "salesData",
            },
        },
        {
            $addFields: {
                totalSold: { $ifNull: [{ $arrayElemAt: ["$salesData.totalSold", 0] }, 0] },
            },
        },
        { $sort: { totalSold: 1, _id: 1 } },
        { $limit: 5 },
        { $project: { name: 1, totalSold: 1 } },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            leastOrdered,
            "Least ordered products fetched successfully."
        )
    );
});