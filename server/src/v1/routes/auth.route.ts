import { Router } from "express";
import AuthController from "../../controllers/Auth/auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../models/User/user.DTO";
import LogInDTO from "../../models/login.DTO";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  validationMiddleware(CreateUserDTO, false),
  authController.register
);

authRouter.post(
  "/login",
  validationMiddleware(LogInDTO, false),
  authController.logIn
);
authRouter.get("/google", authController.googleLogin);
authRouter.get("/google/callback", authController.googleCallback);
authRouter.get("/google/callback/success", authController.success);
authRouter.get("/google/callback/error", authController.error);
