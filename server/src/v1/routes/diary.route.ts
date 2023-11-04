import { Router } from "express";
import CommunityController from "../../controllers/Community/post.controller";
import TopicController from "../../controllers/Community/topic.controller";

import validationMiddleware from "../../middlewares/validation.middleware";
import formDataValidationMiddleware from "../../middlewares/formDataValidation.middleware";
import CreatePostDTO from "../../DTOs/Community/createPost.DTO";

import multer from "multer";
import authMiddleware from "../../middlewares/auth.middleware";

import DiaryController from "../../controllers/Diary/diary.controller";

export const diaryRouter = Router();

const diaryController = new DiaryController();

// Limit file size to 5MB
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

diaryRouter.get("/kid", authMiddleware, diaryController.getKidHealth);
diaryRouter.get("/handbooks", authMiddleware, diaryController.getHandbooks);

// diaryRouter.post("/posts", authMiddleware, upload.fields([{ name: 'photos', maxCount: 5}]), formDataValidationMiddleware(CreatePostDTO), communityController.createPost);
