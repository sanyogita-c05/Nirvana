import supertest from "supertest";
import path from "path";
import { fileURLToPath } from "url";
import User from "../src/models/User.js";
import Product from "../src/models/Product.js";
import Order from "../src/models/Order.js";
import Notification from "../src/models/Notification.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fixturePath = path.join(__dirname, "fixtures", "test-image.jpg");

export const makeUser = (prefix = "user") => {
    const suffix = Date.now();
    return {
        fullName: `${prefix} ${suffix}`,
        phone: `${1000000000 + (suffix % 900000000)}`.slice(0, 10),
        email: `${prefix}${suffix}@example.com`,
        password: "Test@1234",
    };
};

export const clearCollections = async () => {
    await Promise.all([
        User.deleteMany({}),
        Product.deleteMany({}),
        Order.deleteMany({}),
        Notification.deleteMany({}),
    ]);
};

export const createAuthUser = async (app, prefix = "user") => {
    const userData = makeUser(prefix);

    const registerRes = await supertest(app)
        .post("/api/auth/register")
        .send(userData);

    if (registerRes.status !== 201) {
        throw new Error(`Failed to register test user: ${registerRes.body?.message || registerRes.text}`);
    }

    const loginRes = await supertest(app)
        .post("/api/auth/login")
        .send({ email: userData.email, password: userData.password });

    if (loginRes.status !== 200) {
        throw new Error(`Failed to login test user: ${loginRes.body?.message || loginRes.text}`);
    }

    return {
        userData,
        token: loginRes.body.data.token,
        userId: registerRes.body.data.user.id,
    };
};
