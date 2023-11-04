
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import bcrypt from "bcrypt";
import chalk from "chalk";
export default class AWSS3Util {
    /**
     * @param files Files from multer
     * @param userId User id
     * @returns Images Path
     */
    public async uploadImage(files: Record<string, Express.Multer.File[]>, userId: number) {
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
        const hashId = bcrypt.hashSync(userId.toString(), 5);

        files.photos.map(async (file) => {
            const timestamp = Date.parse(new Date().toISOString());
            const key = `posts/${timestamp}-${hashId}-${file.originalname}`;
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

    /**
     * 
     * @param files Array string of image path
     */
    public async deleteImage(files: string[]) {
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

    public async updateAvatar(userId: number, files: Record<string, Express.Multer.File[]>) {
        try {
            // mkdir of user if not exist
            const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
            const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
            const region = process.env.AWS_REGION!;
            const Bucket = process.env.AWS_BUCKET_NAME!;
            const hashId = bcrypt.hashSync(userId.toString(), 5);
            const timestamp = Date.parse(new Date().toISOString());
            const key = `users/${userId}/${timestamp}-${hashId}-${files.avatar[0].originalname}`;
            // Create an S3 Client
            const s3 = new S3Client({
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
                region,
            });

            // upload to S3
            new Upload({
                client: s3,
                params: {
                    Bucket,
                    Key: key,
                    Body: files.avatar[0].buffer
                },
            }).done();

            let imagePath = `${process.env.AWS_URL!}${key}`;
            console.log(chalk.green("Image uploaded successfully", imagePath));
            return imagePath;
        } catch (err) {
            throw err;
        }
    }

}