import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router
    .route("/")
    .post(
        protect,
        upload.single("image"),
        createProduct
    )
    .get(
        protect,
        getAllProducts
    );

router
    .route("/:id")
    .get(
        protect,
        getProductById
    )
    .put(
        protect,
        upload.single("image"),
        updateProduct
    )
    .delete(
        protect,
        deleteProduct
    );

export default router;