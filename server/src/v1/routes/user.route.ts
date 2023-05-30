import { Router } from "express";
import UserController from "./../../controllers/userController";

export const userRouter = Router();
const userController = new UserController();
userRouter.get("/", userController.getAllUsers);
