import { Router } from "express";
import UserController from "../../controllers/User/user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../DTOs/User/UserCreate.DTO";
import authMiddleware from "../../middlewares/auth.middleware";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/profile", authMiddleware, userController.getUserProfile);
userRouter.post("/create-child", authMiddleware, userController.createChild);
userRouter.patch(
  "/child-health/:id",
  authMiddleware,
  userController.updateChildHealth
);
// userRouter.post(
//   "/",
//   validationMiddleware(CreateUserDTO, false),
//   userController.createUser
// );
// userRouter.get("/:id", userController.getUserById);
