import { Router } from "express";
import UserController from "../../controllers/User/user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import CreateUserDTO from "../../DTOs/User/UserCreate.DTO";
import authMiddleware from "../../middlewares/auth.middleware";
import checkKidIDMiddleware from "../../middlewares/checkKidUser.middleware";
import { authorize } from "../../middlewares/authorize.middleware";

export const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/profile",
  authMiddleware,
  authorize(["User"]),
  userController.getUserProfile
);
userRouter.post("/create-child", authMiddleware, userController.createChild);
userRouter.patch(
  "/child-health",
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

// Meal Planning
userRouter.get("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.getMealPlan);

userRouter.post("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.createMealPlan);

userRouter.post(
  "/suggested-meal-plan",
  authMiddleware,
  authorize(["User"]),checkKidIDMiddleware,
  userController.createSuggestedMeals
);

// userRouter.post(
//   "/",
//   validationMiddleware(CreateUserDTO, false),
//   userController.createUser
// );
// userRouter.get("/:id", userController.getUserById);
