import { Comment }  from "../../orm/models/comment.model";
import { CommentReact } from "../../orm/models/comment.react.model";
import { User } from "../../orm/models/user.model";

import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";
import sequelize from "sequelize";
export default class CommentService {
    public async getComment(commentId: number, userId: number): Promise<Comment> {
        try {
            const comment = await Comment.findOne({
                attributes: ["id", "comment", "isAnonymous", "postId", "parentId", 
                [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM comment_reacts WHERE comment_reacts.commentId = Comment.id)"), 0), "likes"],
                "createdAt", "updatedAt"],
                include: [
                    {
                        model: User,
                        attributes: [
                            [sequelize.literal(`IF(replies.isAnonymous = 1 AND user.id != ${userId}, null, user.id)`), 'id'], 
                            [sequelize.literal(`IF(replies.isAnonymous = 1 AND user.id != ${userId}, null, user.fullName)`), 'fullName'], 
                            [sequelize.literal(`IF(replies.isAnonymous = 1 AND user.id != ${userId}, null, user.gender)`), 'gender'],
                            [sequelize.literal(`IF(replies.isAnonymous = 1 AND user.id != ${userId}, null, user.img)`), 'img'],
                        ],
                    },
                    {
                        model: Comment,
                        as: "replies",
                        attributes: ["id", "comment", "isAnonymous", "postId", "parentId",
                        [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM comment_reacts WHERE comment_reacts.commentId = replies.id)"), 0), "likes"],
                        "createdAt", "updatedAt"],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    [sequelize.literal(`IF(Comment.isAnonymous = 1 AND replies.userId != ${userId}, null, user.id)`), 'id'], 
                                    [sequelize.literal(`IF(Comment.isAnonymous = 1 AND replies.userId != ${userId}, null, user.fullName)`), 'fullName'], 
                                    [sequelize.literal(`IF(Comment.isAnonymous = 1 AND replies.userId != ${userId}, null, user.gender)`), 'gender'],
                                    [sequelize.literal(`IF(Comment.isAnonymous = 1 AND replies.userId != ${userId}, null, user.img)`), 'img'],
                                ],
                            }
                        ],
                        order: [["createdAt", "ASC"]],
                        required: false,
                    },
                    {
                        model: CommentReact,
                        attributes: ["createdAt"],
                        include: [
                            {
                                model: User,
                                attributes: ["id", "fullName", "gender", "img"],
                                required: true,
                            }
                        ],
                        required: false
                    },
                ],
                where: {
                    id: commentId,
                },
                logging: true
            });

            if (!comment) {
                throw new HttpException(404, "Comment not found");
            }

            return comment;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @param commentDTO Comment data transfer object
     * @param userId User ID
     * @returns A comment post
     */
    public async createComment(commentDTO: any, userId: number): Promise<Comment> {
        try {
        // 2 Level Comment only
        // Check if parent comment exists
            if (commentDTO.parentId) {
                const parentComment = await Comment.findOne({
                    where: {
                        id: commentDTO.parentId,
                    },
                    attributes: ["id", "parentId"],
                });
                if (parentComment!.parentId != null) {
                    throw new HttpException(404, "Cannot reply to this comment");
                }
            }
            const comment = await Comment.create({
                comment: commentDTO.comment,
                isAnonymous: commentDTO.isAnonymous,
                userId: userId,
                postId: commentDTO.postId,
                parentId: commentDTO.parentId ? commentDTO.parentId : null,
            })

            return comment;
        } catch (err) {
        throw err;
        }
    }

    /**
     * @description Update a comment
     * @param commentDTO Comment data transfer object
     * @param userId 
     * @returns Updated Comment
     */
    public async updateComment(commentDTO: any, userId: number): Promise<Comment> {
        try {
            let comment = await Comment.findOne({
                where: {
                id: commentDTO.id,
                },
                attributes: ["id", "comment", "isAnonymous", "userId", "postId", "parentId"],
            });
        
            if (!comment || comment.userId != userId) {
                throw new HttpException(404, "Comment not found");
            }
        
            await Comment.update({
                comment: commentDTO.comment ? commentDTO.comment : comment.comment,
                isAnonymous: commentDTO.isAnonymous ? commentDTO.isAnonymous : comment.isAnonymous,
            }, {
                where: {
                    id: commentDTO.id,
                },
            });


            comment = await Comment.findOne({
                where: {
                    id: comment.id,
                },
                attributes: ["id", "comment", "isAnonymous", "userId", "postId", "parentId"],
            });
            return comment!;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description Delete a comment
     * @param commentId 
     * @param userId 
     * @returns Delete message
     */
    public async deleteComment(commentId: number, userId: number): Promise<void> {
        try {
            const comment = await Comment.findOne({
                where: {
                    id: commentId,
                },
                attributes: ["id", "comment", "isAnonymous", "userId", "postId", "parentId"],
            });

            if (!comment || comment.userId !== userId) {
                throw new HttpException(404, "Comment not found");
            }
            if (comment.parentId === null) {
                // Detele all child comments
                await Comment.destroy({
                    where: {
                        parentId: commentId,
                    }
                });
            }

            await Comment.destroy({
                where: {
                    id: commentId,
                }
            });
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description Undo delete a comment
     * @param commentId 
     * @param userId 
     * @returns Deleted Comment
     */
    public async undoDeleteComment(commentId: number, userId: number): Promise<Comment> {
        try {
            const comment = await Comment.findOne({
                where: {
                    id: commentId,
                },
                attributes: ["id", "comment", "isAnonymous", "userId", "postId", "parentId"],
                paranoid: false,
            });

            if (!comment || comment.userId != userId) {
                throw new HttpException(404, "Comment not found");
            }
            // Restore all child comments
            await Comment.restore({
                where: {
                    parentId: commentId,
                }
            });

            await Comment.restore({
                where: {
                    id: commentId,
                }
            });

            return comment;
        } catch (err) {
            throw err;
        }
    }

    public async reactComment(commentId: number, userId: number, react: boolean): Promise<Comment> {
        try {
            const comment = await Comment.findOne({
                where: {
                    id: commentId,
                },
            });

            if (!comment) {
                throw new HttpException(404, "Comment not found");
            }

            const [reacted, res] = await CommentReact.findOrCreate({
                where: {
                    commentId: commentId,
                    userId: userId,
                },
                defaults: {
                    commentId: commentId,
                    userId: userId,
                },
            });

            if (reacted.isLike != react) {
                console.log(chalk.green("React updated successfully"));
                await CommentReact.update({
                    isLike: react
                }, {
                    where: {
                        commentId: commentId,
                        userId: userId,
                    },
                });
            } else {
                // Remove react
                await CommentReact.destroy({
                    where: {
                        id: reacted.id
                    },
                    force: true
                })
                console.log(chalk.green("React removed successfully"));
            }
            return comment;
        } catch (error) {
            throw error;
        }
    }
}
