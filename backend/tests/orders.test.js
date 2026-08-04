

import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import Product from "../src/models/Product.js";
import Order from "../src/models/Order.js";

const BASE = "/api/orders";

let ownerToken, ownerId;
let otherUserToken, otherUserId;
let product; // fresh product re-seeded before most tests

const validCustomer = { name: "Rahul Sharma", phone: "9876543210", email: "rahul@example.com", city: "Pune" };

const seedProduct = async (ownerId, overrides = {}) =>
    Product.create({
        owner: ownerId,
        sku: overrides.sku || `POT-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        name: "Handmade Pot",
        description: "Test item",
        category: "Craft",
        imagePath: "test-image.jpg",
        stockQuantity: 20,
        costPrice: 300,
        sellingPrice: 500,
        isActive: true,
        ...overrides,
    });

beforeAll(async () => {
    const ownerRes = await request(app)
        .post("/api/auth/register")
        .send({ fullName: "Order Owner", email: "orderowner@example.com", phone: "9999990001", password: "Test@1234" });
    ownerId = ownerRes.body.data?.user?.id || ownerRes.body.data?.user?._id;

    const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "orderowner@example.com", password: "Test@1234" });
    ownerToken = loginRes.body.data?.token || loginRes.body.token;

    const otherRes = await request(app)
        .post("/api/auth/register")
        .send({ fullName: "Other Owner", email: "otheruser@example.com", phone: "9999990002", password: "Test@1234" });
    otherUserId = otherRes.body.data?.user?.id || otherRes.body.data?.user?._id;

    const otherLogin = await request(app)
        .post("/api/auth/login")
        .send({ email: "otheruser@example.com", password: "Test@1234" });
    otherUserToken = otherLogin.body.data?.token || otherLogin.body.token;
});

beforeEach(async () => {
    await Order.deleteMany({});
    await Product.deleteMany({});
    product = await seedProduct(ownerId);
});

afterAll(async () => {
    await mongoose.connection.close();
});

const validOrderPayload = (overrides = {}) => ({
    customer: validCustomer,
    items: [{ productId: product._id, quantity: 2 }],
    orderDate: new Date().toISOString(),
    ...overrides,
});

describe("Order Management API", () => {
    // ---------- CREATE ORDER ----------
    describe(`POST ${BASE}`, () => {
        it("should create an order, reduce stock, and compute financials correctly", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            expect(res.statusCode).toBe(201);
            const order = res.body.data;
            expect(order.orderNumber).toMatch(/^ORD/);
            expect(order.subtotal).toBe(1000); // 500 * 2
            expect(order.totalAmount).toBe(1000);
            expect(order.payment.status).toBe("Unpaid");
            expect(order.payment.remainingAmount).toBe(1000);
            expect(order.orderStatus).toBe("Active");

            const updatedProduct = await Product.findById(product._id);
            expect(updatedProduct.stockQuantity).toBe(18);
        });

        it("should reject missing customer fields", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ customer: { name: "Rahul" } }));

            expect(res.statusCode).toBe(400);
        });

        it("should reject missing orderDate", async () => {
    const rest = { ...validOrderPayload() };
    delete rest.orderDate;

    const res = await request(app)
        .post(BASE)
        .set("Authorization", `Bearer ${ownerToken}`)
        .send(rest);

    expect(res.statusCode).toBe(400);
});

        it("should reject an empty items array", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ items: [] }));

            expect(res.statusCode).toBe(400);
        });

        it("should reject an item with quantity < 1", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ items: [{ productId: product._id, quantity: 0 }] }));

            expect(res.statusCode).toBe(400);
        });

        it("should reject an order referencing another user's product (owner-scoped lookup)", async () => {
            const otherProduct = await seedProduct(otherUserId);
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ items: [{ productId: otherProduct._id, quantity: 1 }] }));

            expect(res.statusCode).toBe(404);
        });

        it("should reject and not reduce any stock when quantity exceeds available stock", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ items: [{ productId: product._id, quantity: 999 }] }));

            expect(res.statusCode).toBe(400);
            const unchanged = await Product.findById(product._id);
            expect(unchanged.stockQuantity).toBe(20);
        });

        it("should roll back stock for earlier items when a later item in the same order fails", async () => {
            const product2 = await seedProduct(ownerId, { sku: "CHR-001", name: "Wooden Chair", stockQuantity: 1 });

            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(
                    validOrderPayload({
                        items: [
                            { productId: product._id, quantity: 2 }, // succeeds, reduces stock
                            { productId: product2._id, quantity: 5 }, // fails: insufficient stock
                        ],
                    })
                );

            expect(res.statusCode).toBe(400);
            const restored = await Product.findById(product._id);
            expect(restored.stockQuantity).toBe(20); // rolled back to original
        });

        it("should reject negative discount", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ discount: -50 }));

            expect(res.statusCode).toBe(400);
        });

        it("should reject when discount + tax exceed subtotal (negative totalAmount)", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ discount: 5000 }));

            expect(res.statusCode).toBe(400);
        });

        it("should reject amountPaid greater than totalAmount", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ payment: { amountPaid: 999999 } }));

            expect(res.statusCode).toBe(400);
        });

        it("should mark payment status 'Partially Paid' when amountPaid is between 0 and totalAmount", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ payment: { amountPaid: 400 } }));

            expect(res.statusCode).toBe(201);
            expect(res.body.data.payment.status).toBe("Partially Paid");
            expect(res.body.data.payment.remainingAmount).toBe(600);
        });

        it("should mark payment status 'Fully Settled' when amountPaid equals totalAmount", async () => {
            const res = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ payment: { amountPaid: 1000 } }));

            expect(res.statusCode).toBe(201);
            expect(res.body.data.payment.status).toBe("Fully Settled");
            expect(res.body.data.payment.remainingAmount).toBe(0);
        });

        it("should reject requests without an auth token", async () => {
            const res = await request(app).post(BASE).send(validOrderPayload());
            expect(res.statusCode).toBe(401);
        });
    });

    // ---------- GET ALL / RECENT ----------
    describe(`GET ${BASE}`, () => {
        it("should return only the authenticated owner's active orders", async () => {
            await request(app).post(BASE).set("Authorization", `Bearer ${ownerToken}`).send(validOrderPayload());

            const otherProduct = await seedProduct(otherUserId);
            await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${otherUserToken}`)
                .send(validOrderPayload({ items: [{ productId: otherProduct._id, quantity: 1 }] }));

            const res = await request(app).get(BASE).set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBe(1);
        });

        it("should exclude soft-deleted orders", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            await request(app)
                .delete(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            const res = await request(app).get(BASE).set("Authorization", `Bearer ${ownerToken}`);
            expect(res.body.data.length).toBe(0);
        });

        it("should reject requests without an auth token", async () => {
            const res = await request(app).get(BASE);
            expect(res.statusCode).toBe(401);
        });
    });

    describe(`GET ${BASE}/recent`, () => {
        it("should return at most 4 orders, most recent first", async () => {
            for (let i = 0; i < 6; i++) {
                await Product.findByIdAndUpdate(product._id, { stockQuantity: 20 });
                await request(app).post(BASE).set("Authorization", `Bearer ${ownerToken}`).send(validOrderPayload());
            }

            const res = await request(app).get(`${BASE}/recent`).set("Authorization", `Bearer ${ownerToken}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBe(4);
        });
    });

    // ---------- GET BY ID ----------
    describe(`GET ${BASE}/:id`, () => {
        it("should fetch a single order by id", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .get(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data._id).toBe(createRes.body.data._id);
        });

        it("should return 404 for another user's order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .get(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${otherUserToken}`);

            expect(res.statusCode).toBe(404);
        });

        it("should return 404 for a non-existent order id", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`${BASE}/${fakeId}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(404);
        });
    });

    // ---------- UPDATE ----------
    describe(`PUT ${BASE}/:id`, () => {
        it("should update items on an Active order: restore old stock and reduce new stock", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload({ items: [{ productId: product._id, quantity: 2 }] }));

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send({ items: [{ productId: product._id, quantity: 5 }] });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.subtotal).toBe(2500); // 500 * 5

            const updatedProduct = await Product.findById(product._id);
            expect(updatedProduct.stockQuantity).toBe(15); // 20 - 5
        });

        it("should recompute financials when discount/tax/amountPaid change", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send({ discount: 100, tax: 50 });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.totalAmount).toBe(950); // 1000 - 100 + 50
        });

        it("should reject editing a Closed order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            await Order.findByIdAndUpdate(createRes.body.data._id, {
                orderStatus: "Closed",
                "shipment.trackingNumber": "TRK123",
            });

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send({ notes: "trying to edit" });

            expect(res.statusCode).toBe(400);
        });

        it("should reject changing items on a Shipped order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            await Order.findByIdAndUpdate(createRes.body.data._id, {
                orderStatus: "Shipped",
                "shipment.trackingNumber": "TRK123",
            });

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send({ items: [{ productId: product._id, quantity: 1 }] });

            expect(res.statusCode).toBe(400);
        });

        it("should allow updating shipment/tracking on a Shipped order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            await Order.findByIdAndUpdate(createRes.body.data._id, {
                orderStatus: "Shipped",
                "shipment.trackingNumber": "TRK123",
            });

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send({ shipment: { trackingNumber: "TRK456", courierName: "BlueDart" } });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.shipment.trackingNumber).toBe("TRK456");
        });

        it("should fail (500, generic message) moving orderStatus to Shipped without a tracking number", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send({ orderStatus: "Shipped" }); // no shipment.trackingNumber provided

            // errorHandler.js has no branch for Mongoose ValidationError, so the
            // pre("validate") hook's message ("Tracking number is required...")
            // is swallowed and masked as a generic 500 "Internal Server Error".
            // This is a real bug candidate worth flagging — see note below.
            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe("Internal Server Error");
        });

        it("should return 404 when updating another user's order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .put(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${otherUserToken}`)
                .send({ notes: "hijack attempt" });

            expect(res.statusCode).toBe(404);
        });
    });

    // ---------- DELETE (SOFT) ----------
    describe(`DELETE ${BASE}/:id`, () => {
        it("should soft-delete an Active order and restore stock", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .delete(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(200);

            const restoredProduct = await Product.findById(product._id);
            expect(restoredProduct.stockQuantity).toBe(20);

            const dbOrder = await Order.findById(createRes.body.data._id);
            expect(dbOrder.isActive).toBe(false);
        });

        it("should reject deleting a Shipped order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            await Order.findByIdAndUpdate(createRes.body.data._id, {
                orderStatus: "Shipped",
                "shipment.trackingNumber": "TRK123",
            });

            const res = await request(app)
                .delete(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(400);
        });

        it("should reject deleting a Closed order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            await Order.findByIdAndUpdate(createRes.body.data._id, {
                orderStatus: "Closed",
                "shipment.trackingNumber": "TRK123",
            });

            const res = await request(app)
                .delete(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(400);
        });

        it("should return 404 deleting a non-existent order", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .delete(`${BASE}/${fakeId}`)
                .set("Authorization", `Bearer ${ownerToken}`);

            expect(res.statusCode).toBe(404);
        });

        it("should return 404 deleting another user's order", async () => {
            const createRes = await request(app)
                .post(BASE)
                .set("Authorization", `Bearer ${ownerToken}`)
                .send(validOrderPayload());

            const res = await request(app)
                .delete(`${BASE}/${createRes.body.data._id}`)
                .set("Authorization", `Bearer ${otherUserToken}`);

            expect(res.statusCode).toBe(404);
        });
    });
});