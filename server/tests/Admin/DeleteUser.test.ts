import request from "supertest";
// import jest
import { describe, it, expect } from "@jest/globals";
import { beforeAll } from "@jest/globals";
import dotenv from "dotenv";

var userId: number;
describe("Admin Panel", () => {
    // Load the environment variables
    dotenv.config({
        path: "./environments/.env.test"
    });

    let agent = request.agent(`${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}`);
    beforeAll(async () => {
        const register = await agent.post("/api/v1/auth/register").send({
            email: "test@test3.com",
            fullName: "Test 3",
            role: "User",
            verifiedMethod: "Email",
        });
        const verifying = await agent.post("/api/v1/auth/verify").send({
            verifiedCode: register.body["verifiedCode"]
        });
        const setPassword = await agent.post("/api/v1/auth/password").send({
            password: "Asdfgh123!",
            confirmPassword: "Asdfgh123!"
        });

        userId = setPassword.body["user"].id;
        // Auto login after register

        const createChild = await agent.post("/api/v1/users/create-child").send({
            fullName: "Kid Test 3",
            gender: "male",
            dob: "2020-01-01",
            weight: 20,
            height: 100
        });
        const createMealPlan = await agent.post("/api/v1/users/meal-plan").send({
            kidId: createChild.body["kidId"],
            nMeal: 3,
        });
        console.log(createMealPlan.body);

        // Test Delete User
        // Logout -> Login as Admin -> Delete User
        const logout = await agent.get("/api/v1/auth/logout");
        console.log(logout.body);
        const login = await agent.post("/api/v1/auth/login").send({
            email: "test@admin1.com",
            password: "Asdfgh123!"
        });

    });

    it("Soft Delete user - should return 200 OK", async () => {
        const deleteUser = await agent.delete("/api/v1/admin/users").query({
            id: userId,
            force: "0"
        });
    
        expect(deleteUser.status).toBe(200);
        expect(deleteUser.body).toHaveProperty("msg", "Delete user successfully");
    });
    
    it("Undo Delete user - should return 200 OK", async () => {
        const deleteUser = await agent.patch("/api/v1/admin/users").query({
            id: userId,
        });
    
        expect(deleteUser.status).toBe(200);
        expect(deleteUser.body).toHaveProperty("msg", "Undo delete user successfully");
    });

    it("Force Delete user - should return 200 OK", async () => {
        const deleteUser = await agent.delete("/api/v1/admin/users").query({
            id: userId,
            force: "1"
        });
    
        expect(deleteUser.status).toBe(200);
        expect(deleteUser.body).toHaveProperty("msg", "Delete user successfully");
    });
});