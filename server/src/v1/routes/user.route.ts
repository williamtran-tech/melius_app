import { Router } from "express";
import UserController from "../../controllers/User/user.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import checkKidIDMiddleware from "../../middlewares/checkKidUser.middleware";
import { authorize } from "../../middlewares/authorize.middleware";

export const userRouter = Router();
const userController = new UserController();

// Profile User
userRouter.get("/profile", authMiddleware, authorize(["User"]), userController.getUserProfile);

// Kid Preferences
userRouter.get("/profile/kid", authMiddleware,authorize(["User"]),checkKidIDMiddleware, userController.getKidProfile)
          .post("/create-child", authMiddleware, userController.createChild)
          .patch("/child-health", authMiddleware, userController.updateChildHealth);

// ALLERGIES
// Add ingredient to allergy list of kid
userRouter.post("/allergy", authMiddleware, checkKidIDMiddleware, userController.addIngredientToAllergyList)
          .get("/allergy", authMiddleware, authorize(["User"]), checkKidIDMiddleware, userController.getAllergyList)
          .delete("/allergy", authMiddleware, authorize(["User"]), userController.deleteAllergy)
          .patch("/allergy", authMiddleware, authorize(["User"]), userController.undoDeleteAllergies);

// AVAILABLE INGREDIENTS
// Add ingredient to available list of mother
userRouter.post("/available-ingredients", authMiddleware, userController.addIngredientToAvailableList)
          .get("/available-ingredients", authMiddleware, userController.getAvailableIngredientList)
          .delete("/available-ingredients", authMiddleware, authorize(["User"]), userController.deleteAvailableIngredient)
          .patch("/available-ingredients", authMiddleware, authorize(["User"]), userController.undoDeleteAvailableIngredients);

// Meal Planning
userRouter.get("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.getMealPlan)
          .post("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.createMealPlan)
          .delete("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.deleteMealPlan);

userRouter.post("/suggested-meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware, userController.createSuggestedMeals);


// userRouter.post(
//   "/",
//   validationMiddleware(CreateUserDTO, false),
//   userController.createUser
// );
// userRouter.get("/:id", userController.getUserById);
