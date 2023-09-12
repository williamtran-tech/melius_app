import sequelize from "sequelize";
import dotenv from "dotenv";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import { Post } from "../../orm/models/post.model";
import { User } from "../../orm/models/user.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { PostImage } from "../../orm/models/post.images.model";
import { Comment }  from "../../orm/models/comment.model";
import { TagPostRels } from "../../orm/models/tag.post.rel.model";
import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";
import { View } from "../../orm/models/view.model";


export default class PostService {
    constructor() {}
    /**
     * Get all posts
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
    public async getAllPosts(topic: string, limit: number): Promise<Post[]> {
        try {
            const topicId = await Topic.findOne({
                attributes: ["id"],
                where: {
                    name: topic,
                },
            });

            if (!topicId) {
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
                    [sequelize.literal("(SELECT COUNT(id) FROM comments WHERE comments.postId = Post.id)"), "comments"]
                ],
                include: [
                {
                    model: User,
                    attributes: ["id", "fullName", "gender", "img"],
                    where: {
                    id: sequelize.col("userId"),
                    }
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
                    topicId: topicId.id,
                },
                order: [["createdAt", "DESC"]],
                group: ["Post.id"],
                limit: limit,
            })
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
    public async getPost(postId: number, userId?: number): Promise<Post> {
        try {
            const post = await Post.findOne({
                attributes: [
                    "id",
                    "content",
                    "isAnonymous",
                    "createdAt",
                    "updatedAt",
                    [sequelize.literal("(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)"), "views"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "likes"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "dislikes"],
                ],
                include: [
                    {
                        model: User,
                        attributes: ["id", "fullName", "gender", "img"],
                        where: {
                        id: sequelize.col("userId"),
                        }
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
                        model: Topic,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Comment,
                        attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt"],
                        as: "comments",
                        where: {
                            postId: sequelize.col("Post.id"),
                            parentId: null, // Get only parent comments
                        },
                        order: [["updatedAt", "DESC"]],
                        include: [
                            {
                                model: User,
                                attributes: ["id", "fullName", 'img'],
                            },
                            {
                                model: Comment,
                                as: "replies",
                                attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt"],
                                where: {
                                    parentId: sequelize.col("comments.id"),
                                },
                                order: [["updatedAt", "DESC"]],
                                include: [
                                    {
                                        model: User,
                                        attributes: ["id", "fullName", 'img']
                                    }
                                ],
                            }
                        ],
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
                    where: {
                        id: postId,
                    },
                });
            
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

                if (updateView[1] == false) {
                    console.log(chalk.green("View updated successfully"));
                }
            }
            return post as Post;
        } catch (err) {
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
            dotenv.config();
            // Create post
            const createdPost = await Post.create({
                content: postDTO.content,
                isAnonymous: postDTO.isAnonymous,
                userId: postDTO.userId,
                topicId: postDTO.topicId,
            });

            // Associate post with tags
            if (postDTO.tags.length > 0) {
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

            console.log(chalk.green("Post created successfully"));
            if (postDTO.files['photos'] && postDTO.files['photos'].length > 0) {
                console.log(chalk.green("Uploading images..."));
                const files = postDTO.files as Record<string, Express.Multer.File[]>;
                
                // Upload new file to S3
                // const date = Date.parse(new Date().toISOString());
                // console.log(date);
            
                // // Convert timestamp to date time
                // const dateString = new Date(date).toJSON().slice(0, 19).replace('T', ' ');
                // console.log("Date Time:",dateString);
                
                files.photos.map(async (file) => {
                    const timestamp = Date.parse(new Date().toISOString());
                    const key = `posts/${timestamp}-${file.originalname}`;
                    
                    const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
                    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
                    const region = process.env.AWS_REGION!;
                    const Bucket = process.env.AWS_BUCKET_NAME!;
                    
                    files.photos.map(async (file) => {
                        // upload to S3
                        new Upload({
                        client: new S3Client({
                            credentials: {
                                accessKeyId,
                                secretAccessKey,
                            },
                            region,
                        }),
                        params: {
                            Bucket,
                            Key: key,
                            Body: file.buffer
                        },
                        }).done();
                        // Associate post with images
                        await PostImage.create({
                        imagePath: process.env.AWS_URL + key,
                        postId: createdPost?.id,
                        });
                    });
                    console.log(chalk.green("Uploading images successfully"));
                });
            }

            return createdPost;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update a post
     * @param req.body: Request { content: string, filePath: string, isAnonymous: boolean, userId: number, topicId: number, tagIds: number[] }
     * @returns A post
     * @example /api/v1/community/posts/1
     */
    public async updatePost(postDTO: any): Promise<Post> {
        try {
            const updatedPost = await Post.update({
                content: postDTO.content,
                isAnonymous: postDTO.isAnonymous,
                topicId: postDTO.topicId,
            }, {
                where: {
                    id: postDTO.postId,
                },
            });

            // Associate post with tags
            if (postDTO.tags.length > 0) {
                postDTO.tags.map(async (tag: string) => {
                    const createdTag = await Tag.findOrCreate({
                        where: {
                            name: tag.trim(),
                        },
                        attributes: ["id", "name"]
                    });
                });
            }
            const post = await Post.findOne({
                where: {
                    id: postDTO.postId,
                },
            });

            if (!post) {
                throw new HttpException(404, "Post not found");
            }

            console.log(chalk.green("Post updated successfully"));
            return post as Post;
        } catch (error) {
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

    /**
     * Undo delete a post
     * @param req.params: Request { postId: number }
     * @returns A post
     * @example /api/v1/community/posts/1
     */
    public async undoDeletePost(postId: number, userId: number) {
        try {
            await this.undoDeletePostRels(postId, userId);
            const undoDeletedPost = await Post.findOne({
                where: {
                    id: postId,
                    userId: userId
                },
            });
            if (!undoDeletedPost) {
                throw new HttpException(404, "Post not found");
            }

            console.log(chalk.green("Post undo deleted successfully"));
            return undoDeletedPost;
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