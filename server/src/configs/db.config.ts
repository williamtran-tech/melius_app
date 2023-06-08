import mongoose from "mongoose";

const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
export const connectDB = (): void => {
  console.log("Connecting to database...");
  mongoose.Promise = global.Promise;
  mongoose
    .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
      dbName: "melius_db",
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((err: Error) => {
      console.log("Could not connect to database...", err);
      process.exit();
    });
};
