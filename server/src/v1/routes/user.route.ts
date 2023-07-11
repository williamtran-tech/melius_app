import { Router } from "express";
import UserController from "../../controllers/User/user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../DTOs/User/UserCreate.DTO";
import authMiddleware from "../../middlewares/auth.middleware";
import checkKidIDMiddleware from "../../middlewares/checkKidUser.middleware";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/profile", authMiddleware, userController.getUserProfile);
userRouter.post("/create-child", authMiddleware, userController.createChild);
userRouter.patch(
  "/child-health/:id",
  authMiddleware,
  userController.updateChildHealth
);

// ALLERGIES
// Add ingredient to allergy list of kid
userRouter.post(
  "/allergy",
  authMiddleware,
  checkKidIDMiddleware,
  userController.addIngredientToAllergyList
);

// Read allergy list of kid
userRouter.get("/allergy", authMiddleware, userController.getAllergyList);

// AVAILABLE INGREDIENTS
// Add ingredient to available list of mother
userRouter.post(
  "/available-ingredients",
  authMiddleware,
  userController.addIngredientToAvailableList
);
userRouter.get(
  "/available-ingredients",
  authMiddleware,
  userController.getAvailableIngredientList
);

// userRouter.post(
//   "/",
//   validationMiddleware(CreateUserDTO, false),
//   userController.createUser
// );
// userRouter.get("/:id", userController.getUserById);
