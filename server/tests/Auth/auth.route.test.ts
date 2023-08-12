import request from "supertest";
// import jest
import { describe, it, expect } from "@jest/globals";
import dotenv from "dotenv";

describe("Login", () => {
    // Load the environment variables
    dotenv.config({
        path: "./environments/.env.test"
    });

    it("should return 200 OK", async () => {
        const response = await (request(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`).post("/api/v1/auth/login")).send({
            email: "test@test1.com",
            password: "Asdfgh123!"
        });
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            msg: "User logged in successfully",
        });
    });

    // TC-1: Not sending email and password
    it ("should return 400 Bad Request", async () => {
        const response = await (request(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`).post("/api/v1/auth/login")).send({
            email: "",
            password: ""
        });
    
        expect(response.status).toBe(400);
    });

    // TC-2: Sending only email
    it("should return 400 Bad Request", async () => {
        const response = await (request(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`).post("/api/v1/auth/login")).send({
            email: "test@test1.com",
            password: "asdddd"
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Invalid credentials",
        });
    });

    // TC-3: Login when user is already logged in
    it("should return 400 Bad Request - User already logged in", async () => {
        // ARRANGE
        // Set up the test environment to simulate a logged-in user
        const agent = request.agent(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`);
        const before = await agent.post("/api/v1/auth/login").send({
            email: "test@test1.com",
            password: "Asdfgh123!"
        });

        // ACT
        // Try to log in again using the agent
        const response = await agent.post("/api/v1/auth/login").send({
            email: "test@test1.com",
            password: "Asdfgh123!"
        });

        // Assert the expected behavior
        // Get the value of the "set-cookie" header
        const cookies = before.header["set-cookie"];
        // let authorization: string = "";
        // authorization = cookies[0].split(";")[0];
        const containsAuthorization = cookies.some((cookie: string) => cookie.includes("Authorization"));
        
        // ASSERT
        expect(containsAuthorization).toBe(true);
        expect(response.status).toBe(400);
    });
});