import { Router } from "express";
import CommunityController from "../../controllers/Community/post.controller";
import TopicController from "../../controllers/Community/topic.controller";

import validationMiddleware from "../../middlewares/validation.middleware";
import formDataValidationMiddleware from "../../middlewares/formDataValidation.middleware";
import CreatePostDTO from "../../DTOs/Community/createPost.DTO";

import multer from "multer";
import authMiddleware from "../../middlewares/auth.middleware";
import TagController from "../../controllers/Community/tag.controller";
import ReactController from "../../controllers/Community/react.controller";
import CommentController from "../../controllers/Community/comment.controller";

export const communityRouter = Router();

const communityController = new CommunityController();
const topicController = new TopicController();
const tagController = new TagController();
const reactController = new ReactController();
const commentController = new CommentController();

// Limit file size to 5MB
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

communityRouter.get("/posts", authMiddleware, communityController.getAllPosts);
communityRouter.post("/posts", authMiddleware, upload.fields([{ name: 'photos', maxCount: 5}]), formDataValidationMiddleware(CreatePostDTO), communityController.createPost)
                .post("/posts/:id", authMiddleware, upload.fields([{ name: 'photos', maxCount: 5}]), communityController.updatePost)
                .patch("/posts/:id", authMiddleware, reactController.reactPost)
                .get("/posts/:id", authMiddleware, communityController.getPost)
                .patch("/posts", authMiddleware, communityController.undoDeletePost)
                .delete("/posts", authMiddleware, communityController.deletePost)
                /**
                 * @Description: Delete images of a post
                 */
                .delete("/posts/:id", authMiddleware, communityController.deleteImages);

communityRouter.get("/posts/post-details/comments", authMiddleware, commentController.getComment)
                .post("/posts/post-details/comments", authMiddleware, commentController.createComment)
                .patch("/posts/post-details/comments", authMiddleware, commentController.updateComment)
                .delete("/posts/post-details/comments", authMiddleware, commentController.deleteComment)
                .patch("/posts/post-details/comments/:id", authMiddleware, commentController.undoDeleteComment);
                
communityRouter.get("/topics", authMiddleware, topicController.getAllTopics);
communityRouter.get("/topics/topic-details", authMiddleware, topicController.getAllPostsByTopic);

communityRouter.get("/tags", authMiddleware, tagController.getAllTags);
communityRouter.get("/tags/tag-details", authMiddleware, tagController.getAllPostsByTag);
