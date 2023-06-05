import { Router } from "express";
import AuthController from "../../controllers/Auth/auth.controller";

export const authRouter = Router();
const authController = new AuthController();

authRouter.get("/google", authController.googleLogin);
authRouter.get("/google/callback", authController.googleCallback);
authRouter.get("/google/success", authController.success);
authRouter.get("/google/error", authController.error);
