import request from "supertest";
// import jest
import { describe, it, expect } from "@jest/globals";
import { beforeAll } from "@jest/globals";
import dotenv from "dotenv";

describe("Meal Plan", () => {
    // Load the environment variables
    dotenv.config({
        path: "./environments/.env.test"
    });

    let agent = request.agent(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`);
    beforeAll(async () => {
        const before = await agent.post("/api/v1/auth/login").send({
            email: "test@test1.com",
            password: "Asdfgh123!"
        });
    });

    it("Get user profile - should return 200 OK", async () => {
        const response = await agent.get("/api/v1/users/profile");
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("msg", "Get user profile successfully");
        console.log(response.body["msg"]);
    });

    it("Get user meal plan - should return 200 OK", async () => {
        const response = await agent.get("/api/v1/users/meal-plan").query({
            kidId: "2"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("msg", "Get meal plan successfully");
    });

    it("Input wrong kid ID - should return 404 Not Found", async () => {
        const response = await agent.get("/api/v1/users/meal-plan").query({
            kidId: "0"
        });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Kid not found");
    });

});