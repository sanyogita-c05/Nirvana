import request from "supertest";
import app from "../src/app.js";
import { clearCollections, createAuthUser } from "./helpers.js";

const isDbAvailable = () => globalThis.__dbTestsEnabled !== false;

describe("Dashboard API", () => {
    let token;

    beforeEach(async () => {
        if (!isDbAvailable()) return;
        await clearCollections();
        const auth = await createAuthUser(app, `dash-${Date.now()}`);
        token = auth.token;
    });

    it("returns dashboard statistics for an authenticated owner", async () => {
        if (!isDbAvailable()) return;

        const res = await request(app)
            .get("/api/dashboard/stats")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.revenue).toBeDefined();
        expect(res.body.data.orders).toBeDefined();
        expect(res.body.data.products).toBeDefined();
        expect(res.body.data.customers).toBeDefined();
    });

    it("returns revenue and weekly chart data", async () => {
        if (!isDbAvailable()) return;

        const revenueRes = await request(app)
            .get("/api/dashboard/revenue-chart")
            .set("Authorization", `Bearer ${token}`);

        const weeklyRes = await request(app)
            .get("/api/dashboard/weekly-stats")
            .set("Authorization", `Bearer ${token}`);

        expect(revenueRes.status).toBe(200);
        expect(Array.isArray(revenueRes.body.data)).toBe(true);
        expect(weeklyRes.status).toBe(200);
        expect(weeklyRes.body.data.revenue).toBeDefined();
        expect(weeklyRes.body.data.orders).toBeDefined();
    });
});
