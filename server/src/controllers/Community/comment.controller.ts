import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import PostService from "../../services/Community/post.service";
import CommentService from "../../services/Community/comment.service";

import HttpException from "../../exceptions/HttpException";
import chalk from "chalk";

export default class CommentController extends BaseController {
    constructor() {
        super();
    }
    public postService = new PostService();
    public commentService = new CommentService();
    // COMMENT FUNCTIONS
    public getComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.query.id) {
                throw new HttpException(404, "Comment not found");
            }
            const commentId = Number(req.query.id);
            const userId = Number(req.userData.id);
            const comment = await this.commentService.getComment(commentId, userId);
            res.status(200).json({
                msg: "Get comment successfully",
                comment: comment
            });
        } catch (err) {
            next(err);
        }
    }

    public createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.body.postId);
            const userId = Number(req.userData.id);

            const commentDTO = {
                comment: req.body.comment,
                isAnonymous: req.body.isAnonymous,
                parentId: req.body.parentId ? req.body.parentId : null,
                userId: userId,
                postId: postId,
            }
            
            const comment = await this.commentService.createComment(commentDTO, userId);
            res.status(200).json({
                msg: "Comment post successfully",
                comment: comment
            });
        } catch (err) {
            next(err);
        }
    }

    public updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentId = Number(req.query.id);
            const userId = Number(req.userData.id);

            const commentDTO = {
                id: commentId,
                comment: req.query.comment,
                isAnonymous: req.query.isAnonymous,
            }
            
            const comment = await this.commentService.updateComment(commentDTO, userId);
            res.status(200).json({
                msg: "Comment update successfully",
                comment: comment
            });
        } catch (err) {
            next(err);
        }
    }

    public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentId = Number(req.query.id);
            const userId = Number(req.userData.id);
            await this.commentService.deleteComment(commentId, userId);
            res.status(200).json({
                msg: "Comment delete successfully",
            });
        } catch (err) {
            next(err);
        }
    }

    public undoDeleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentId = Number(req.params.id);
            const userId = Number(req.userData.id);
            if (req.query.react) {
                const react = Number(req.query.react);
                await this.commentService.reactComment(commentId, userId, Boolean(react));
                const comment = await this.commentService.getComment(commentId, userId);
                res.status(200).json({
                    msg: "React comment successfully",
                    comment: comment
                });
            } else {
                const deletedComment = await this.commentService.undoDeleteComment(commentId, userId);
                const comment = await this.commentService.getComment(commentId, userId);
                res.status(200).json({
                    msg: "Undo delete comment successfully",
                    comment: comment
                });
            }
        } catch (err) {
            next(err);
        }
    }
}
