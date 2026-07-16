import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router
    .route("/")
    .post(
        protect,
        createOrder
    )
    .get(
        protect,
        getAllOrders
    );

router
    .route("/:id")
    .get(
        protect,
        getOrderById
    )
    .put(
        protect,
        updateOrder
    )
    .delete(
        protect,
        deleteOrder
    );

export default router;