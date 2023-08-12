import request from "supertest";
import dotenv from "dotenv";

// import jest
import { describe, it, expect } from "@jest/globals";

describe("Test default path", () => {
    // Load the environment variables
    dotenv.config({
        path: "./environments/.env.test"
    });

    it("should return 200 OK", async () => {
        const result = await request(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`).get("/api/v1/");
        expect(result.status).toBe(200);
    });
2
    it("should return 404 Not Found", async () => {
        const result = await request(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`).get("/api/v1/xyz");
        expect(result.status).toBe(404);
    });
});