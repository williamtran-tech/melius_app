import { Router } from "express";
import CommunityController from "../../controllers/Community/post.controller";
import TopicController from "../../controllers/Community/topic.controller";

import validationMiddleware from "../../middlewares/validation.middleware";
import formDataValidationMiddleware from "../../middlewares/formDataValidation.middleware";
import CreatePostDTO from "../../DTOs/Community/createPost.DTO";

import multer from "multer";
import authMiddleware from "../../middlewares/auth.middleware";

import AdminController from "../../controllers/Admin/admin.controller";
import { authorize } from "../../middlewares/authorize.middleware";

export const adminRouter = Router();

const adminController = new AdminController();

// Authorize Admin later
adminRouter.get("/users", authMiddleware, authorize(["Admin"]), adminController.getAllMothers)
            .delete("/users", authMiddleware, authorize(["Admin"]), adminController.deleteUser)
            .patch("/users", authMiddleware, authorize(["Admin"]), adminController.undoDeleteUser);

adminRouter.get("/users/doctors", authMiddleware, authorize(["Admin"]), adminController.getAllDoctors)
            .post("/users/doctors", authMiddleware, authorize(["Admin"]), adminController.createDoctor)
            .delete("/users/doctors", authMiddleware, authorize(["Admin"]), adminController.deleteUser)
            .patch("/users/doctors", authMiddleware, authorize(["Admin"]), adminController.undoDeleteUser)
            .patch("/users/doctors/details", authMiddleware, authorize(["Admin"]), adminController.updateUser);