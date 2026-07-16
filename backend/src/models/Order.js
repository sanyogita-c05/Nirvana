import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        sku: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        imagePath: {
            type: String,
            required: true,
            trim: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
        },

        costPrice: {
            type: Number,
            required: true,
            min: [0, "Cost price cannot be negative"],
        },

        priceAtSale: {
            type: Number,
            required: true,
            min: [0, "Selling price cannot be negative"],
        },

        lineTotal: {
            type: Number,
            required: true,
            min: [0, "Line total cannot be negative"],
        },
    },
    {
        _id: false,
    }
);

const orderSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        orderNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
            index: true,
        },

        customer: {
            name: {
                type: String,
                required: [true, "Customer name is required"],
                trim: true,
                minlength: 2,
                maxlength: 100,
            },

            phone: {
                type: String,
                required: [true, "Customer phone number is required"],
                trim: true,
            },

            email: {
                type: String,
                required: [true, "Customer email is required"],
                trim: true,
                lowercase: true,
            },
        },

        items: {
            type: [orderItemSchema],
            validate: [
                (value) => value.length > 0,
                "At least one product is required.",
            ],
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
            min: [0, "Subtotal cannot be negative"],
        },

        discount: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative"],
        },

        tax: {
            type: Number,
            default: 0,
            min: [0, "Tax cannot be negative"],
        },

        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total amount cannot be negative"],
        },

        payment: {
            status: {
                type: String,
                enum: ["Unpaid", "Partially Paid", "Fully Settled"],
                required: true,
                default: "Unpaid",
            },

            method: {
                type: String,
                enum: ["Cash", "Digital/UPI", "Card", "N/A"],
                required: true,
                default: "N/A",
            },

            amountPaid: {
                type: Number,
                default: 0,
                min: [0, "Amount paid cannot be negative"],
            },

            remainingAmount: {
                type: Number,
                required: true,
                min: [0, "Remaining amount cannot be negative"],
            },
        },

        shipmentDetails: {
            address: {
                type: String,
                trim: true,
                default: "",
            },

            courierName: {
                type: String,
                trim: true,
                default: "",
            },

            trackingNumber: {
                type: String,
                trim: true,
                default: "",
            },
        },

        orderDate: {
            type: Date,
            required: [true, "Order date is required"],
        },

        deliveryDate: {
            type: Date,
            default: null,
        },

        orderStatus: {
            type: String,
            enum: ["Active", "Shipped", "Closed"],
            required: true,
            default: "Active",
            index: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
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

/*
|--------------------------------------------------------------------------
| Shipment Validation
|--------------------------------------------------------------------------
*/

orderSchema.pre("validate", function (next) {
    if (
        (this.orderStatus === "Shipped" ||
            this.orderStatus === "Closed") &&
        (
            !this.shipmentDetails.address ||
            !this.shipmentDetails.courierName ||
            !this.shipmentDetails.trackingNumber
        )
    ) {
        return next(
            new Error(
                "Address, courier name and tracking number are required for shipped or closed orders."
            )
        );
    }


});

const Order = mongoose.model("Order", orderSchema);

export default Order;