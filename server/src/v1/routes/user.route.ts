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
          .patch("/child-health", authMiddleware, checkKidIDMiddleware, userController.updateChildHealth);

// ALLERGIES
// Add ingredient to allergy list of kid
userRouter.post("/allergy", authMiddleware, checkKidIDMiddleware, userController.addIngredientToAllergyList)
          .get("/allergy", authMiddleware, authorize(["User"]), checkKidIDMiddleware, userController.getAllergyList)
          .delete("/allergy", authMiddleware, authorize(["User"]), userController.deleteAllergy)
          .patch("/allergy", authMiddleware, authorize(["User"]), userController.undoDeleteAllergies);

// AVAILABLE INGREDIENTS
// Add ingredient to available list of mother
userRouter.post("/available-ingredients", authMiddleware, userController.addIngredientsToAvailableList)
          .get("/available-ingredients", authMiddleware, userController.getAvailableIngredientList)
          .delete("/available-ingredients", authMiddleware, authorize(["User"]), userController.deleteAvailableIngredient)
          .patch("/available-ingredients", authMiddleware, authorize(["User"]), userController.undoDeleteAvailableIngredients);

// Meal Planning
userRouter.get("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.getMealPlan)
          .post("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.createMealPlan)
          .delete("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.deleteMealPlan)
          .patch("/meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.undoDeleteMealPlan);

userRouter.post("/suggested-meal-plan", authMiddleware, authorize(["User"]),checkKidIDMiddleware, userController.createSuggestedMeals);
userRouter.get("/suggested-meal-plan/beta", authMiddleware, authorize(["User"]),checkKidIDMiddleware, userController.createSuggestedMealsBeta);

// Meal Details
userRouter.delete("/meal-plan/detail", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.deleteMeal)
          .patch("/meal-plan/detail", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.undoDeleteMeal)
          .patch("/meal-plan/meal-detail", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.updateMeal)
          .post("/meal-plan/detail", authMiddleware, authorize(["User"]),checkKidIDMiddleware,userController.addMeal);
