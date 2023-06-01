import { Router } from "express";
import UserController from "../../controllers/User/user.controller";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createUser);
