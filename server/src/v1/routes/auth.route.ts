import { Router } from "express";
import AuthController from "../../controllers/Auth/auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";

import RegisterUserDTO from "../../DTOs/User/UserRegister.DTO";
import LogInDTO from "../../DTOs/Auth/Login.DTO";
import ResetPasswordDTO from "../../DTOs/Auth/ResetPassword.DTO";

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

// Forgot password
authRouter.post(
  "/forgot-password",
  registerMiddleware,
  validationMiddleware(ResetPasswordDTO, false),
  authController.forgotPassword
);
// Change password
authRouter.patch("/password", registerMiddleware, authController.changePassword);

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
authRouter.post("/google/verify", authController.googleVerify);
// Login with Facebook
// Login with Twitter
