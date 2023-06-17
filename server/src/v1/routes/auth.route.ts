import { Router } from "express";
import AuthController from "../../controllers/Auth/auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";

import RegisterUserDTO from "../../models/User/UserRegister.DTO";
import LogInDTO from "../../models/DTOs/Login.DTO";
import ResetPasswordDTO from "../../models/DTOs/ResetPassword.DTO";

import registerMiddleware from "../../middlewares/register.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  registerMiddleware,
  validationMiddleware(RegisterUserDTO, false),
  authController.register
);
// Verify via email
authRouter.post("/verify", authController.verifyUser);
// Verify via phone

// Set password
authRouter.post("/password", authController.setPassword);
// Change password

// Forgot password
authRouter.post(
  "/forgot-password",
  registerMiddleware,
  validationMiddleware(ResetPasswordDTO, false),
  authController.forgotPassword
);
// Reset password
authRouter.patch("/password", registerMiddleware, authController.setPassword);

authRouter.post(
  "/login",
  validationMiddleware(LogInDTO, false),
  authController.logIn
);
authRouter.get("/logout", authController.logOut);

// Login with Google
authRouter.get("/google", authController.googleLogin);
authRouter.get("/google/callback", authController.googleCallback);
authRouter.get("/google/callback/success", authController.success);
authRouter.get("/google/callback/error", authController.error);
// Login with Facebook
// Login with Twitter
