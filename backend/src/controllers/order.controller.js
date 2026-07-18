import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateSequence from "../utils/generateSequence.js";

/*
----------------------------------------
Helper: Build Order Items (fetch products, validate stock, reduce stock)
----------------------------------------
*/

const buildOrderItemsAndReduceStock = async (items, ownerId) => {

    if (!Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, "At least one product is required.");
    }

    const orderItems = [];
    const reducedSoFar = [];

    try {
        for (const item of items) {

            const { productId, quantity } = item;

            if (!productId || !quantity || Number(quantity) < 1) {
                throw new ApiError(400, "Invalid product or quantity provided.");
            }

            const product = await Product.findOne({
                _id: productId,
                owner: ownerId,
                isActive: true,
            });

            if (!product) {
                throw new ApiError(404, `Product not found for id ${productId}.`);
            }

            if (product.stockQuantity < Number(quantity)) {
                throw new ApiError(
                    400,
                    `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`
                );
            }

            product.stockQuantity -= Number(quantity);
            await product.save();

            reducedSoFar.push({ productId: product._id, quantity: Number(quantity) });

            const lineTotal = product.sellingPrice * Number(quantity);

            orderItems.push({
                productId: product._id,
                sku: product.sku,
                name: product.name,
                category: product.category,
                imagePath: product.imagePath,
                quantity: Number(quantity),
                costPrice: product.costPrice,
                priceAtSale: product.sellingPrice,
                lineTotal,
            });
        }

        return orderItems;

    } catch (error) {
        // Manual rollback: restore stock for everything reduced before the failure
        for (const reduced of reducedSoFar) {
            await Product.findOneAndUpdate(
                { _id: reduced.productId, owner: ownerId },
                { $inc: { stockQuantity: reduced.quantity } },
                { returnDocument: "after" }
            );
        }
        throw error;
    }
};

/*
----------------------------------------
Helper: Restore Stock
----------------------------------------
*/

const restoreStock = async (items, ownerId) => {

    for (const item of items) {
        await Product.findOneAndUpdate(
            {
                _id: item.productId,
                owner: ownerId,
            },
            {
                $inc: { stockQuantity: item.quantity },
            },
            { returnDocument: "after" }
        );
    }
};

/*
----------------------------------------
Helper: Compute Financials
----------------------------------------
*/

const computeFinancials = (orderItems, discount = 0, tax = 0, amountPaid = 0) => {

    const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const safeDiscount = Number(discount) || 0;
    const safeTax = Number(tax) || 0;

    if (safeDiscount < 0) {
        throw new ApiError(400, "Discount cannot be negative.");
    }

    if (safeTax < 0) {
        throw new ApiError(400, "Tax cannot be negative.");
    }

    const totalAmount = subtotal - safeDiscount + safeTax;

    if (totalAmount < 0) {
        throw new ApiError(400, "Discount cannot exceed subtotal and tax.");
    }

    const safeAmountPaid = Number(amountPaid) || 0;

    if (safeAmountPaid < 0) {
        throw new ApiError(400, "Amount paid cannot be negative.");
    }

    if (safeAmountPaid > totalAmount) {
        throw new ApiError(400, "Amount paid cannot exceed total amount.");
    }

    const remainingAmount = totalAmount - safeAmountPaid;

    let paymentStatus = "Unpaid";
    if (safeAmountPaid > 0 && safeAmountPaid < totalAmount) {
        paymentStatus = "Partially Paid";
    } else if (safeAmountPaid === totalAmount && totalAmount > 0) {
        paymentStatus = "Fully Settled";
    } else if (totalAmount === 0 && safeAmountPaid === 0) {
        paymentStatus = "Fully Settled";
    }

    return {
        subtotal,
        discount: safeDiscount,
        tax: safeTax,
        totalAmount,
        amountPaid: safeAmountPaid,
        remainingAmount,
        paymentStatus,
    };
};

/*
----------------------------------------
Create Order
----------------------------------------
*/

export const createOrder = asyncHandler(async (req, res) => {

    const {
        customer,
        items,
        discount,
        tax,
        payment,
        shipmentDetails,
        orderDate,
        deliveryDate,
        orderStatus,
        notes,
    } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.email) {
        throw new ApiError(400, "Customer name, phone and email are required.");
    }

    if (!orderDate) {
        throw new ApiError(400, "Order date is required.");
    }

    // Stock is reduced first; if anything below fails, we manually restore it.
    const orderItems = await buildOrderItemsAndReduceStock(items, req.user._id);

    try {
        const financials = computeFinancials(
            orderItems,
            discount,
            tax,
            payment?.amountPaid
        );

        const orderNumber = await generateSequence("order", "ORD");

        const order = await Order.create({
            owner: req.user._id,
            orderNumber,
            customer,
            items: orderItems,
            subtotal: financials.subtotal,
            discount: financials.discount,
            tax: financials.tax,
            totalAmount: financials.totalAmount,
            payment: {
                status: payment?.status || financials.paymentStatus,
                method: payment?.method || "N/A",
                amountPaid: financials.amountPaid,
                remainingAmount: financials.remainingAmount,
            },
            shipmentDetails: shipmentDetails || {},
            orderDate,
            deliveryDate: deliveryDate || null,
            orderStatus: orderStatus || "Active",
            notes: notes || "",
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                order,
                "Order created successfully."
            )
        );

    } catch (error) {
        // Order creation failed after stock was already reduced — restore it.
        await restoreStock(orderItems, req.user._id);
        throw error;
    }
});

/*
----------------------------------------
Get All Orders
----------------------------------------
*/

export const getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        owner: req.user._id,
        isActive: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully."
        )
    );
});

/*
----------------------------------------
Get Order By Id
----------------------------------------
*/

export const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findOne({
        _id: req.params.id,
        owner: req.user._id,
        isActive: true,
    });

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully."
        )
    );
});

/*
----------------------------------------
Update Order
----------------------------------------
*/

export const updateOrder = asyncHandler(async (req, res) => {

    const {
        customer,
        items,
        discount,
        tax,
        payment,
        shipmentDetails,
        orderDate,
        deliveryDate,
        orderStatus,
        notes,
    } = req.body;

    const order = await Order.findOne({
        _id: req.params.id,
        owner: req.user._id,
        isActive: true,
    });

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    if (order.orderStatus === "Closed") {
        throw new ApiError(400, "Closed orders cannot be edited.");
    }

    if (order.orderStatus === "Shipped" && items) {
        throw new ApiError(
            400,
            "Only tracking and status can be updated for shipped orders."
        );
    }

    let orderItems = order.items;
    let stockAlreadyRestored = false;

    try {
        if (items && order.orderStatus === "Active") {

            // Restore stock for previous items first
            await restoreStock(order.items, req.user._id);
            stockAlreadyRestored = true;

            // Validate and reduce stock for new items
            // (buildOrderItemsAndReduceStock rolls back its own partial reductions on failure)
            orderItems = await buildOrderItemsAndReduceStock(items, req.user._id);
        }

        const financials = computeFinancials(
            orderItems,
            discount !== undefined ? discount : order.discount,
            tax !== undefined ? tax : order.tax,
            payment?.amountPaid !== undefined
                ? payment.amountPaid
                : order.payment.amountPaid
        );

        if (customer) {
            order.customer = customer;
        }

        order.items = orderItems;
        order.subtotal = financials.subtotal;
        order.discount = financials.discount;
        order.tax = financials.tax;
        order.totalAmount = financials.totalAmount;

        order.payment = {
            status: payment?.status || financials.paymentStatus,
            method: payment?.method || order.payment.method,
            amountPaid: financials.amountPaid,
            remainingAmount: financials.remainingAmount,
        };

        if (shipmentDetails) {
            order.shipmentDetails = shipmentDetails;
        }

        if (orderDate) {
            order.orderDate = orderDate;
        }

        if (deliveryDate !== undefined) {
            order.deliveryDate = deliveryDate;
        }

        if (orderStatus) {
            order.orderStatus = orderStatus;
        }

        if (notes !== undefined) {
            order.notes = notes;
        }

        await order.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                order,
                "Order updated successfully."
            )
        );

    } catch (error) {
        // If new stock was reduced but saving the order failed, restore the new items too.
        if (orderItems !== order.items) {
            await restoreStock(orderItems, req.user._id);
        }

        // If we restored old stock but never made it to reducing new stock
        // (e.g. buildOrderItemsAndReduceStock threw), put the old stock back.
        if (stockAlreadyRestored && orderItems === order.items) {
            const originalItems = await Order.findById(order._id).select("items");
            await Product.bulkWrite(
                (originalItems?.items || []).map((item) => ({
                    updateOne: {
                        filter: { _id: item.productId, owner: req.user._id },
                        update: { $inc: { stockQuantity: -item.quantity } },
                    },
                }))
            );
        }

        throw error;
    }
});

/*
----------------------------------------
Soft Delete Order
----------------------------------------
*/

export const deleteOrder = asyncHandler(async (req, res) => {

    const order = await Order.findOne({
        _id: req.params.id,
        owner: req.user._id,
        isActive: true,
    });

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    if (order.orderStatus === "Shipped" || order.orderStatus === "Closed") {
        throw new ApiError(
            400,
            "Shipped or closed orders cannot be deleted."
        );
    }

    await restoreStock(order.items, req.user._id);

    try {
        order.isActive = false;
        await order.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Order deleted successfully."
            )
        );

    } catch (error) {
        // Soft delete failed after stock was restored — reduce it back.
        const rollbackItems = order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        await Product.bulkWrite(
            rollbackItems.map((item) => ({
                updateOne: {
                    filter: { _id: item.productId, owner: req.user._id },
                    update: { $inc: { stockQuantity: -item.quantity } },
                },
            }))
        );

        throw error;
    }
});