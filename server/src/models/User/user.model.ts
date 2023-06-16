import mongoose from "mongoose";
import IUser from "./user.interface";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      validate: [
        {
          validator: function (v: string) {
            // regular expression for email validation
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            return emailRegex.test(v);
          },
          message: "Please enter a valid email",
        },
      ],
    },
    password: {
      type: String,
      min: 6,
      max: 70,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
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
// userSchema.index(
//   { phone: 1 },
//   {
//     unique: true,
//     partialFilterExpression: { phone: { $exists: true, $gt: "" } },
//   }
// );
const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
