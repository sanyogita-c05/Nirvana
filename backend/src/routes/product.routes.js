import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

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

router
    .route("/")
    .post(
        protect,
        upload.array("images", 1),
        createProduct
    )
    .get(
        protect,
        getAllProducts
    );

    router.get("/low-stock", protect, getLowStockProducts);
    router.get("/top-selling", protect, getTopSellingProducts);
router.route("/:id").get(protect, getProductById).put(
    protect,
    upload.array("images", 1),
    updateProduct
)
    .delete(
        protect,
        deleteProduct
    );






export default router;