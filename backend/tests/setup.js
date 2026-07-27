import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDB from "../src/config/db.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret";
    process.env.JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";

    console.log("Mongo URI:", process.env.MONGODB_URI);

    await connectDB();

});

afterAll(async () => {
    await mongoose.connection.close();
    if (mongoServer) await mongoServer.stop();
});