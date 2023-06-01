import mongoose from "mongoose";
import IUser from "./user.interface";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
});

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
