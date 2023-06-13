import { Router } from "express";
import UserController from "../../controllers/User/user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../models/User/UserCreate.DTO";
import authMiddleware from "../../middlewares/auth.middleware";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", authMiddleware, userController.getAllUsers);
// userRouter.post(
//   "/",
//   validationMiddleware(CreateUserDTO, false),
//   userController.createUser
// );
userRouter.get("/:id", userController.getUserById);
