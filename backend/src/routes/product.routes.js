import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/")
    .post(protect, createProduct)
    .get(protect, getProducts);

router.route("/:id")
    .get(protect, getProductById)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

export default router;