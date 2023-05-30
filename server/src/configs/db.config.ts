import mongoose from 'mongoose';

export const connectDB = (): void => {
    console.log("Connecting to database...");
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.ATLAS_URI!, {
        dbName: "melius_db",
    }).then(() => {
        console.log("Successfully connected to database")
    }).catch((err: Error) => {
        console.log("Could not connect to database...", err);
        process.exit();
    });
} 
