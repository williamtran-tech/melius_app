import { Router } from "express";
import CommunityController from "../../controllers/Community/community.controller";

import multer from "multer";
import authMiddleware from "../../middlewares/auth.middleware";
export const communityRouter = Router();
const communityController = new CommunityController();
// Limit file size to 5MB
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

communityRouter.post("/posts", authMiddleware, upload.fields([{ name: 'photos', maxCount: 5}]), communityController.createPost)
                .get("/posts", authMiddleware, communityController.getPost)
                .delete("/posts", authMiddleware, communityController.deletePost)
                .patch("/posts", authMiddleware, communityController.undoDeletePost);

communityRouter.get("/topics", authMiddleware, communityController.getAllTopics);
communityRouter.get("/topics/topic-details", authMiddleware, communityController.getAllPostsByTopic);

communityRouter.get("/tags", authMiddleware, communityController.getAllTags);
communityRouter.get("/tags/tag-details", authMiddleware, communityController.getAllPostsByTag);
