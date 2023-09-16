import sequelize from "sequelize";
import dotenv from "dotenv";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

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
import { React } from "../../orm/models/react.model";
import { CommentReact } from "../../orm/models/comment.react.model";


export default class PostService {
    constructor() {}

    public async getAllPosts(): Promise<Post[]> {
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
                            [sequelize.literal(`IF(isAnonymous = 1, null, user.id)`), 'id'], 
                            [sequelize.literal(`IF(isAnonymous = 1, null, fullName)`), 'fullName'], 
                            [sequelize.literal(`IF(isAnonymous = 1, null, gender)`), 'gender'],
                            [sequelize.literal(`IF(isAnonymous = 1, null, img)`), 'img'],
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
    public async getAllPostsByTopic(topicId: number, limit: number): Promise<[Topic, Post[]]> {
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
                        [sequelize.literal(`IF(isAnonymous = 1, null, user.id)`), 'id'], 
                        [sequelize.literal(`IF(isAnonymous = 1, null, fullName)`), 'fullName'], 
                        [sequelize.literal(`IF(isAnonymous = 1, null, gender)`), 'gender'],
                        [sequelize.literal(`IF(isAnonymous = 1, null, img)`), 'img'],
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
                group: ["Post.id"],
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
    public async getAllPostsByTag(tagId: number, limit: number): Promise<Post[]> {
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
                            [sequelize.literal(`IF(isAnonymous = 1, null, user.id)`), 'id'], 
                            [sequelize.literal(`IF(isAnonymous = 1, null, fullName)`), 'fullName'], 
                            [sequelize.literal(`IF(isAnonymous = 1, null, gender)`), 'gender'],
                            [sequelize.literal(`IF(isAnonymous = 1, null, img)`), 'img'],
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
                    group: ["Post.id"],
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
                        attributes: [
                            [sequelize.literal(`IF(Post.isAnonymous = 1, null, user.id)`), 'id'], 
                            [sequelize.literal(`IF(Post.isAnonymous = 1, null, user.fullName)`), 'fullName'], 
                            [sequelize.literal(`IF(Post.isAnonymous = 1, null, user.gender)`), 'gender'],
                            [sequelize.literal(`IF(Post.isAnonymous = 1, null, user.img)`), 'img'],
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
                        model: Topic,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Comment,
                        attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt",
                        [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM comment_reacts WHERE comment_reacts.commentId = comments.id)"), 0), "likes"],],
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
                                attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt",
                                [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM comment_reacts WHERE comment_reacts.commentId = comments.id)"), 0), "likes"]],
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
                                required: false,
                            },
                        ],
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
                        id: postId,
                    },
                });
            // Check post exists
            if (!post) {
                console.log(chalk.green("Get post Failed"));
                throw new HttpException(404, "Post not found");
            }
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

            if (postDTO.files['photos'] && postDTO.files['photos'].length > 0) {
                console.log(chalk.green("Uploading images..."));
                const imagePaths = await this.uploadImage(postDTO.files);
                
                for (let imagePath of imagePaths) {
                    // Associate post with images
                    console.log(chalk.green("imagePath: ", imagePath));
                    await PostImage.create({
                        imagePath: imagePath,
                        postId: createdPost?.id,
                    });
                }
                console.log(chalk.green("Uploading images successfully"));
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
        try{
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
                content: postDTO.content ? postDTO.content : post.content,
                isAnonymous: postDTO.isAnonymous ? postDTO.isAnonymous : post.isAnonymous,
                topicId: postDTO.topicId ? postDTO.topicId : post.topicId,
            }, {
                where: {
                    id: postDTO.id,
                },
            });

            // Upload new file to S3 if exist
            if (postDTO.files['photos'] && postDTO.files['photos'].length > 0) {
                // Remove the old files in AWS S3
                const oldImages = await PostImage.findAll({
                    attributes: ["imagePath"],
                    where: {
                        postId: postDTO.id,
                    },
                });
                const oldImagePaths = oldImages.map((image) => image.imagePath);
                console.log("Old Images:", oldImagePaths);
                await this.deleteImage(oldImagePaths);
                
                // Remove the old images in database
                await PostImage.destroy({
                    where: {
                        postId: postDTO.id,
                    },
                    force: true
                });
                
                // Upload new files to AWS S3
                console.log(chalk.green("Uploading images..."));
                const imagePaths = await this.uploadImage(postDTO.files);
                
                for (let imagePath of imagePaths) {
                    // Associate post with images
                    console.log(chalk.green("imagePath: ", imagePath));
                    await PostImage.create({
                        imagePath: imagePath,
                        postId: post?.id,
                    });
                }
                console.log(chalk.green("Uploading images successfully"));
            }
            
            // Associate post with tags
            if (postDTO.tags.length > 0) {
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
            const finalPost = await Post.findOne({
                where: {
                    id: postDTO.id,
                },
            });
            
            console.log(chalk.green("Post updated successfully"));
            return finalPost as Post;
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

    private async uploadImage(files: Record<string, Express.Multer.File[]>) {
        let imagePaths: string[] = [];
        // Upload new file to S3
        // const date = Date.parse(new Date().toISOString());
        // console.log(date);
    
        // // Convert timestamp to date time
        // const dateString = new Date(date).toJSON().slice(0, 19).replace('T', ' ');
        // console.log("Date Time:",dateString);  
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
        const region = process.env.AWS_REGION!;
        const Bucket = process.env.AWS_BUCKET_NAME!;
        
        files.photos.map(async (file) => {
            const timestamp = Date.parse(new Date().toISOString());
            const key = `posts/${timestamp}-${file.originalname}`;
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
            
            console.log(chalk.green("Image uploaded successfully", key));
            let imagePath = `${process.env.AWS_URL!}${key}`;
            imagePaths.push(imagePath);
        });

        return imagePaths;
    }

    private async deleteImage(files: string[]) {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
        const region = process.env.AWS_REGION!;
        const Bucket = process.env.AWS_BUCKET_NAME!;

        files.map(async (file) => {
            const key = file.split(process.env.AWS_URL!)[1];

            // Create an S3 Client
            const s3 = new S3Client({
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
                region,
            });

            // Create the command.
            const command = new DeleteObjectCommand({
                Bucket,
                Key: key,
            });

            // Run the command.
            await s3.send(command);
            
            console.log(chalk.green("Image deleted successfully", key));
        });
    }
}