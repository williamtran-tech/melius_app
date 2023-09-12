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

communityRouter.get("/posts", authMiddleware, communityController.getAllPosts);
communityRouter.get("/posts/post-details", authMiddleware, communityController.getPost)
                .delete("/posts/post-details", authMiddleware, communityController.deletePost)
                .patch("/posts/post-details", authMiddleware, communityController.undoDeletePost);
communityRouter.post("/posts", authMiddleware, upload.fields([{ name: 'photos', maxCount: 5}]), communityController.createPost);
