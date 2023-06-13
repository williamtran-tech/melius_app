import { Router } from "express";
import AuthController from "../../controllers/Auth/auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../models/User/UserCreate.DTO";
import RegisterUserDTO from "../../models/User/UserRegister.DTO";
import LogInDTO from "../../models/login.DTO";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  validationMiddleware(RegisterUserDTO, false),
  authController.register
);

// Verify via email
authRouter.post("/verify", authController.verifyUser);

// Verify via phone

// Set password
authRouter.post("/password", authController.setPassword);
// Reset password

// Forgot password

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
