import sequelize from "sequelize";
import { Post } from "../../orm/models/post.model";
import { User } from "../../orm/models/user.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { PostImage } from "../../orm/models/post.images.model";
import { Comment }  from "../../orm/models/comment.model";
import { TagPostRels } from "../../orm/models/tag.post.rel.model";
import { View } from "../../orm/models/view.model";
import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";

import PostImageService from "./post.image.service";

import AWSS3Util from "../../utils/aws.s3.util";
import { CommentReact } from "../../orm/models/comment.react.model";


export default class PostService {
    public awsS3Util = new AWSS3Util();
    public postImageService = new PostImageService();
    constructor() {}

    /**
     * 
     * @returns All posts
     */
    public async getAllPosts(userId: number): Promise<Post[]> {
        const posts = await Post.findAll({
            attributes: [
                "id", 
                "content", 
                "isAnonymous", 
                "createdAt", 
                "updatedAt", 
                [sequelize.literal("(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)"), "views"],
                // Using COALESCE for return 0 if null 
                // Using CAST for convert to SIGNED numeric data type instead of a string
                [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "likes"],
                [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "dislikes"],
                [sequelize.literal("(SELECT COUNT(id) FROM comments WHERE comments.postId = Post.id)"), "comments"],],
                include: [
                    {
                        model: Topic,
                        attributes: ["id", "name"],
                    },
                    {
                        model: User,
                        attributes: [
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.id)`), 'id'], 
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.fullName)`), 'fullName'], 
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.gender)`), 'gender'],
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.img)`), 'img'],
                        ],
                    },
                    {
                        model: Tag,
                        attributes: ["id", "name"],
                        through: {
                        attributes: [],
                        },
                        required: false
                    },
                    {
                        model: PostImage,
                        attributes: ["id", "imagePath", "caption"],
                        where: {
                            postId: sequelize.col("Post.id"),
                        },
                        required: false
                    },
                ],  
                order: [["createdAt", "DESC"]],
                group: ["Post.id"],
        });

        return posts;
    }

    /**
     * Get all posts by Topic
     * @param req.query: Request { topic: string, limit: number}
     * @template {
    * "msg": "Get all posts successfully",
    * "posts": [
    *  {
    *     "id": 1,
    *     "content": "Test content",
    *    "isAnonymous": false,
    *    "createdAt": "2021-08-09T15:00:00.000Z",
    *    "updatedAt": "2021-08-09T15:00:00.000Z",
    *    "views": 0,
    *    "likes": 0,
    *    "dislikes": 0,
    *    "comments": 0,
    *    "User": {
    *       "id": 1,
    *       "fullName": "Nguyen Van A",
    *      }
    *  }
    * ]
    * }
    * @example /api/v1/community/posts?topic=QnA&limit=10
    * @returns All posts of a topic with limit
    */
    public async getAllPostsByTopic(topicId: number, limit: number, userId: number): Promise<[Topic, Post[]]> {
        try {
            const topic = await Topic.findOne({
                attributes: ["id", "name"],
                where: {
                    id: topicId,
                },
            });

            if (!topic) {
                throw new HttpException(404, "Topic not found");
            }

            const posts = await Post.findAll({
                attributes: [
                    "id", 
                    "content", 
                    "isAnonymous", 
                    "createdAt", 
                    "updatedAt", 
                    [sequelize.literal("(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)"), "views"],
                    // Using COALESCE for return 0 if null 
                    // Using CAST for convert to SIGNED numeric data type instead of a string
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "likes"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "dislikes"],
                    [sequelize.literal("(SELECT COUNT(id) FROM comments WHERE comments.postId = Post.id)"), "comments"],
                ],
                include: [  
                {
                    model: User,
                    attributes: [
                        [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.id)`), 'id'], 
                        [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.fullName)`), 'fullName'], 
                        [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.gender)`), 'gender'],
                        [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.img)`), 'img'],
                    ],
                },
                {
                    model: Tag,
                    attributes: ["id", "name"],
                    through: {
                    attributes: [],
                    },
                    required: false
                },
                {
                    model: PostImage,
                    attributes: ["id", "imagePath", "caption"],
                    where: {
                        postId: sequelize.col("Post.id"),
                    },
                    required: false
                },
                ],
                where: {
                    topicId: topic.id,
                },
                order: [["createdAt", "DESC"]],
                limit: limit,
            })
            return [topic, posts];
        } catch (err) {
        throw err;
        }
    }

    /**
     * 
     * @param tagId Tag id
     * @param limit Number of posts
     * @returns All posts of a tag with limit
     */
    public async getAllPostsByTag(tagId: number, limit: number, userId: number): Promise<Post[]> {
        try {
            const tag = await Tag.findOne({
                attributes: ["id"],
                where: {
                    id: tagId,
                },
            });
            if (!tag) {
                throw new HttpException(404, "Tag not found");
            }

            const postsId = await TagPostRels.findAll({
                attributes: ["postId"],
                where: {
                    tagId: tag.id,
                },
            });

            const posts = await Post.findAll({
                attributes: [
                    "id", 
                    "content", 
                    "isAnonymous", 
                    "createdAt", 
                    "updatedAt", 
                    [sequelize.literal("(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)"), "views"],
                    // Using COALESCE for return 0 if null 
                    // Using CAST for convert to SIGNED numeric data type instead of a string
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "likes"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "dislikes"],
                    [sequelize.literal("(SELECT COUNT(id) FROM comments WHERE comments.postId = Post.id)"), "comments"],
                ],
                where: {
                    id: postsId.map((post) => post.postId),
                },
                include: [  
                    {
                        model: User,
                        attributes: [
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.id)`), 'id'], 
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.fullName)`), 'fullName'], 
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.gender)`), 'gender'],
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.img)`), 'img'],
                        ],
                    },
                    {
                        model: Tag,
                        attributes: ["id", "name"],
                        through: {
                            attributes: [],
                        },
                        required: false,
                    },
                    {
                        model: PostImage,
                        attributes: ["id", "imagePath", "caption"],
                        where: {
                            postId: sequelize.col("Post.id"),
                        },
                        required: false
                    },
                    ],
                    order: [["createdAt", "DESC"]],
                    limit: limit,
            });
            
            return posts;
        } catch (err) {
            throw err;
        }
    }

    /**
         * 
         * @param req req.id: 
         * @return A post details
         * @example /api/v1/community/posts/1
         * @template {
     * "msg": "Get post successfully",
     * "post": {
     *  Post attributes, Views, Reacts, Comments, Tags, Topic, User
     * }
     * }
     */
    public async getPost(postId: number, userId: number) {
        try {
            const post = await Post.findOne({
                attributes: [
                    "id",
                    "content",
                    "isAnonymous",
                    "createdAt",
                    "updatedAt",
                    [
                        sequelize.literal('(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)'),
                        'views'
                    ],
                    [
                        sequelize.fn("COALESCE", sequelize.literal('(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)'), 0),
                        'likes'
                    ],
                    [
                        sequelize.fn("COALESCE", sequelize.literal('(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)'), 0),
                        'dislikes'
                    ],
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.id)`), 'id'],
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.fullName)`), 'fullName'],
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.gender)`), 'gender'],
                            [sequelize.literal(`IF(Post.isAnonymous = 1 AND user.id != ${userId}, null, user.img)`), 'img'],
                        ],
                    },
                    {
                        model: Tag,
                        attributes: ["id", "name"],
                        through: {
                            attributes: [],
                        },
                        required: false,
                    },
                    {
                        model: Topic,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Comment,
                        as: "comments",
                        attributes: [
                            "id",
                            "comment",
                            "isAnonymous",
                            "createdAt",
                            "updatedAt",
                            [
                                sequelize.fn(
                                    "COALESCE",
                                    sequelize.literal('(SELECT CAST(SUM(isLike) AS SIGNED) FROM comment_reacts WHERE comment_reacts.commentId = comments.id)'),
                                    0
                                ),
                                "likes",
                            ],
                        ],
                        where: {
                            postId: sequelize.col('Post.id'),
                            parentId: null, // Get only parent comments
                        },
                        order: [["updatedAt", "DESC"]],
                        include: [
                            {
                                model: User,
                                attributes: ["id", "fullName", "img"],
                            },
                            {
                                model: Comment,
                                as: "replies",
                                attributes: [
                                    "id",
                                    "comment",
                                    "isAnonymous",
                                    "createdAt",
                                    "updatedAt",
                                ],
                                where: {
                                    parentId: sequelize.col('comments.id'),
                                },
                                order: [["updatedAt", "DESC"]],
                                include: [
                                    {
                                        model: User,
                                        attributes: ["id", "fullName", "img"],
                                    },
                                    {
                                        model: CommentReact,
                                        as: "reacts",
                                        attributes: ["id"],
                                    }
                                ],
                                required: false,
                            },
                        ],
                        required: false,
                    },
                    {
                        model: PostImage,
                        attributes: ["id", "imagePath", "caption", "postId"],
                        where: {
                            postId: sequelize.col("Post.id"),
                        },
                        required: false,
                    },
                ],
                where: {
                    id: postId,
                },
            });
            // Loop through the replies and update "likes" to 0 if there are no likes
            console.log("Parent comments of post", post?.comments.length);
            if (post?.comments.length && post?.comments.length > 0) {
                const firstParentComment = post.comments[0];
                console.log("Child comments of first parent comment", firstParentComment.replies?.length);
            }
            post?.comments.map((comment) => {
                if (comment.replies?.length && comment.replies?.length > 0) {
                    comment.replies.map((reply) => {
                        if (reply.reacts?.length && reply.reacts?.length > 0) {
                            reply.setDataValue("likes", reply.reacts.length)
                            delete reply.dataValues.reacts;
                        }
                        else {
                            reply.setDataValue("likes", 0);
                            delete reply.dataValues.reacts;
                        }
                    });
                }
            })

            // console.log("Child comments of first parent comment", post?.comments.replies.length);
            // Update views
            if (userId) {
                const updateView = await View.findOrCreate({
                    where: {
                        postId: postId,
                        userId: userId,
                    },
                    defaults: {
                        postId: postId,
                        userId: userId,
                        view: 1,
                    },
                });

                if (updateView[1] == true) {
                    console.log(chalk.green("View updated successfully"));
                }
            }
            return post;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * Create a post
     * @param req.body: Request { content: string, filePath: string, isAnonymous: boolean, userId: number, topicId: number, tagIds: number[] }
     * @returns A post
     */
    public async createPost(postDTO: any): Promise<Post> {
        try {
            // Create post
            const createdPost = await Post.create({
                content: postDTO.content,
                isAnonymous: postDTO.isAnonymous,
                userId: postDTO.userId,
                topicId: postDTO.topicId,
            });

            // Associate post with tags
            if (postDTO.tags && postDTO.tags.length > 0) {
                postDTO.tags.map(async (tag: string) => {
                    const createdTag = await Tag.findOrCreate({
                        where: {
                            name: tag.trim(),
                        },
                        attributes: ["id", "name"]
                    });
                    
                    await TagPostRels.create({
                        postId: createdPost.id,
                        tagId: createdTag[0].id,
                    });
                });
            }

            if (postDTO.files['photos'] && postDTO.files['photos'].length > 0) {
                console.log(chalk.green("Uploading images..."));
                await this.postImageService.uploadImages(postDTO.files, postDTO.userId, createdPost.id);
            }
            console.log(chalk.green("Post created successfully"));

            return createdPost;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update a post - Undo delete post
     * @param req.body: Request { content: string, filePath: string, isAnonymous: boolean, userId: number, topicId: number, tagIds: number[] }
     * @returns A post
     * @example /api/v1/community/posts/1
     */
    public async updatePost(postDTO: any, userId: number): Promise<Post> {
        try {
            const post = await Post.findOne({
                where: {
                    id: postDTO.id,
                    userId: userId,
                }
            });
            if (!post) {
                throw new HttpException(404, "Post not found");
            }

            const updatedPost = await Post.update({
                content: (postDTO.content.length > 0) ? postDTO.content : post.content,
                isAnonymous: postDTO.isAnonymous ? postDTO.isAnonymous : post.isAnonymous,
                topicId: postDTO.topicId ? postDTO.topicId : post.topicId,
            }, {
                where: {
                    id: postDTO.id,
                },
            });

            // Upload new file to S3 if exists
            if (postDTO.files['photos'] && postDTO.files['photos'].length > 0) {
                // Upload new files to AWS S3
                console.log(chalk.green("Uploading images..."));
                await this.postImageService.uploadImages(postDTO.files, userId, post.id);
            }
            
            // Associate post with tags
            if (postDTO.tags && postDTO.tags.length > 0) {
                postDTO.tags.map(async (tag: string) => {
                    const createdTag = await Tag.findOrCreate({
                        where: {
                            name: tag.trim(),
                        },
                        attributes: ["id", "name"]
                    });

                    // Remove the old tags
                    await TagPostRels.destroy({
                        where: {
                            postId: postDTO.id,
                        }, 
                        force: true
                    });
                    
                    // Create association between post and tags
                    await TagPostRels.create({
                        postId: postDTO.id,
                        tagId: createdTag[0].id,
                    });
                    console.log(chalk.green("Tag created - associated successfully", tag));
                });
            }
            if (!postDTO.tags || postDTO.tags.length == 0) {
                // Remove the old tags
                await TagPostRels.destroy({
                    where: {
                        postId: postDTO.id,
                    }, 
                    force: true
                });
                console.log(chalk.green("Remove all tags successfully"));
            }
            const finalPost = await Post.findOne({
                where: {
                    id: postDTO.id,
                },
            });
            
            console.log(chalk.green("Post updated successfully"));
            return finalPost as Post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Delete a post
     * @param req.params: Request { postId: number }
     * @returns A post
     * @example /api/v1/community/posts/1
     */
    public async deletePost(postId: number, userId: number) {
        try {
            await this.deletePostRels(postId, userId);
        } catch (error) {
            throw error;
        }
    }

    public async undoDeletePost(postId: number, userId: number) {
        try {
            await this.undoDeletePostRels(postId, userId);

        } catch (error) {
            throw error;
        }
    }

    private async deletePostRels(postId: number, userId: number) {
        const deletedPost = await Post.destroy({
            where: {
                id: postId,
                userId: userId
            },
        });
        if (deletedPost === 0) {
            throw new HttpException(404, "Post not found");
        }
        // Delete tags of post
        const tag_rels = await TagPostRels.destroy({
            where: {
                postId: postId,
            },
        });
        console.log(chalk.green("TagPostRels deleted successfully"), tag_rels);

        // Delete images of post
        const images = await PostImage.destroy({
            where: {
                postId: postId,
            },
        });
        console.log(chalk.green("PostImage deleted successfully"), images);

        // Delete comments of post
        const comments = await Comment.destroy({
            where: {
                postId: postId,
            },
        });
        console.log(chalk.green("Comment deleted successfully"), comments);

        console.log(chalk.green("Post deleted successfully"));
        return deletedPost;
    }

    private async undoDeletePostRels(postId: number, userId: number) {
        await Post.restore({
            where: {
                id: postId,
                userId: userId
            },
        });

        await TagPostRels.restore({
            where: {
                postId: postId,
            },
        });

        await PostImage.restore({
            where: {
                postId: postId,
            },
        });

    }
}