import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import assignProductId from "../middleware/assignProductId.middleware.js";

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    getTopSellingProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// Shared Multer config: up to 6 images + 1 video per request.
const productUpload = upload.fields([
    { name: "images", maxCount: 6 },
    { name: "video", maxCount: 1 },
]);

router
    .route("/")
    .post(
        protect,
        assignProductId, // must run BEFORE productUpload — Multer's destination needs req.productId
        productUpload,
        createProduct
    )
    .get(
        protect,
        getAllProducts
    );

router.get("/low-stock", protect, getLowStockProducts);
router.get("/top-selling", protect, getTopSellingProducts);

router
    .route("/:id")
    .get(protect, getProductById)
    .put(
        protect,
        // no assignProductId here — req.params.id already exists,
        // upload.middleware.js falls back to it
        productUpload,
        updateProduct
    )
    .delete(
        protect,
        deleteProduct
    );

export default router;