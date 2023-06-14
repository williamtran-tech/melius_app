import mongoose from "mongoose";
import IUser from "./user.interface";
import validator from "validator";
import HttpException from "../../exceptions/HttpException";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      min: 6,
      max: 70,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    phone: {
      type: String,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
      RegExp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    },
    img: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Enable unique index for the 'email' field
userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
