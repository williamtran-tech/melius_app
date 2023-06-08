import { Router } from "express";
import UserController from "../../controllers/User/user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../models/User/user.DTO";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAllUsers);
// userRouter.post(
//   "/",
//   validationMiddleware(CreateUserDTO, false),
//   userController.createUser
// );
userRouter.get("/:id", userController.getUserById);
