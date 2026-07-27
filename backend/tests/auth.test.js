import request from "supertest";
import app from "../src/app.js";

let token;

const testUser = {
    fullName: "Automation User",
    phone: "9999999999",
    email: "automation@gmail.com",
    password: "1234"
};

describe("Authentication API",()=>{

    // REGISTER

    test("AUTH-001 Register user successfully", async()=>{
        const response = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.token).toBeDefined();
    });

    test("AUTH-002 Register duplicate email", async()=>{
        const response = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
    });

    test("AUTH-003 Register without required fields", async()=>{
        const response = await request(app)
            .post("/api/auth/register")
            .send({ email: "test@gmail.com" });

        expect(response.status).toBe(400);
    });

    // LOGIN

    test("AUTH-004 Login with valid credentials", async()=>{
        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: testUser.email, password: testUser.password });

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();

        token = response.body.data.token;
    });

    test("AUTH-005 Login with wrong password", async()=>{
        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: testUser.email, password: "wrongpassword" });

        expect(response.status).toBe(401);
    });

    test("AUTH-006 Login without password", async()=>{
        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: testUser.email });

        expect(response.status).toBe(400);
    });

    // GET ME

    test("AUTH-007 Get current user with token", async()=>{
        const response = await request(app)
            .get("/api/auth/me")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    test("AUTH-008 Get current user without token", async()=>{
        const response = await request(app).get("/api/auth/me");
        expect(response.status).toBe(401);
    });

    // CHANGE PASSWORD

    test("AUTH-010 Change password with wrong old password", async()=>{
        const response = await request(app)
            .put("/api/auth/change-password")
            .set("Authorization", `Bearer ${token}`)
            .send({ oldPassword: "wrong", newPassword: "9999" });

        expect(response.status).toBe(400);
    });

    test("AUTH-009 Change password successfully", async()=>{
        const response = await request(app)
            .put("/api/auth/change-password")
            .set("Authorization", `Bearer ${token}`)
            .send({ oldPassword: "1234", newPassword: "5678" });

        expect(response.status).toBe(200);
    });

});
