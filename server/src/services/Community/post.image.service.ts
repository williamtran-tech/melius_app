import { Post } from "../../orm/models/post.model";
import { PostImage } from "../../orm/models/post.images.model";

import chalk from "chalk";

import AWSS3Util from "../../utils/aws.s3.util";

import HttpException from "../../exceptions/HttpException";
export default class PostImageService {
    public awsS3Util = new AWSS3Util();

    public async uploadImages(files: Record<string, Express.Multer.File[]>, userId: number, postId: number) {
        try {
            const imagePaths = await this.awsS3Util.uploadImage(files, userId);
                
            for (let imagePath of imagePaths) {
                // Associate post with images
                console.log(chalk.green("imagePath: ", imagePath));
                await PostImage.create({
                    imagePath: imagePath,
                    postId: postId,
                });
            }
            console.log(chalk.green("Uploading images successfully"));
        } catch (err) {
            throw err;
        }
    }
    public async deleteImages(ids: number[], userId: number, postId: number) {
        try {
            // Remove the old files in AWS S3
            const oldImages = await PostImage.findAll({
                attributes: ["imagePath"],
                include: [
                    {
                        model: Post,
                        attributes: ["id", "userId"],
                        where: {
                            userId: userId
                        }
                    }
                ],
                where: {
                    id: ids,
                    postId: postId
                },
            });
            console.log("Old Images:", oldImages.toString());
            if (oldImages.length === 0) {
                throw new HttpException(404, "No images found");
            }
            const oldImagePaths = oldImages.map((image) => image.imagePath);
            console.log("Old Images:", oldImagePaths);
            await this.awsS3Util.deleteImage(oldImagePaths);
            
            // Remove the old images in database
            await PostImage.destroy({
                where: {
                    id: ids,
                },
                force: true
            });
            console.log(chalk.green("Delete images"));
        } catch (err) {
            throw err;
        }
    }

   
}
