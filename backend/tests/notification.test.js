import request from "supertest";
import app from "../src/app.js";
import { clearCollections, createAuthUser, fixturePath } from "./helpers.js";

const isDbAvailable = () => globalThis.__dbTestsEnabled !== false;

describe("Notification API", () => {
    let token;

    beforeAll(async () => {
        if (!isDbAvailable()) return;
        await clearCollections();
        const auth = await createAuthUser(app, "notif");
        token = auth.token;
    });

    beforeEach(async () => {
        if (!isDbAvailable()) return;
        await clearCollections();
        const auth = await createAuthUser(app, `notif-${Date.now()}`);
        token = auth.token;
    });

    it("returns an empty notification list for a new user", async () => {
        if (!isDbAvailable()) return;

        const res = await request(app)
            .get("/api/notifications")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
    });

    it("marks a notification as read and clears all notifications", async () => {
        if (!isDbAvailable()) return;

        const createRes = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .field("name", "Alert Product")
            .field("category", "Craft")
            .field("costPrice", 10)
            .field("sellingPrice", 20)
            .field("stockQuantity", 2)
            .attach("images", fixturePath);

        expect(createRes.status).toBe(201);

        const notificationsRes = await request(app)
            .get("/api/notifications")
            .set("Authorization", `Bearer ${token}`);

        expect(notificationsRes.status).toBe(200);
        expect(notificationsRes.body.data.length).toBeGreaterThan(0);

        const id = notificationsRes.body.data[0]._id;

        const markRes = await request(app)
            .put(`/api/notifications/${id}/read`)
            .set("Authorization", `Bearer ${token}`);

        expect(markRes.status).toBe(200);
        expect(markRes.body.data.isRead).toBe(true);

        const clearRes = await request(app)
            .delete("/api/notifications/clear-all")
            .set("Authorization", `Bearer ${token}`);

        expect(clearRes.status).toBe(200);

        const afterClear = await request(app)
            .get("/api/notifications")
            .set("Authorization", `Bearer ${token}`);

        expect(afterClear.body.data).toEqual([]);
    });
});
