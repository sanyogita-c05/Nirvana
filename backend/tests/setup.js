import { jest } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDB from "../src/config/db.js";

let mongoServer;
let consoleErrorSpy;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    process.env.MONGODB_URI = mongoServer.getUri();
    process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret";
    process.env.JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";

    console.log("Mongo URI:", process.env.MONGODB_URI);

    await connectDB();

    consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation((...args) => {
            console.log(...args);
        });
});

afterAll(async () => {
    consoleErrorSpy.mockRestore();

    await mongoose.connection.close();

    if (mongoServer) {
        await mongoServer.stop();
    }
});