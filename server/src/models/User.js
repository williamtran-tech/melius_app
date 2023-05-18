const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
let timestampPlugin = require("./plugins/timestamp");

// This is define the shape of the document - Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
  },
  { timestamps: true }
);

// This is a middleware - plugin for timestamp
userSchema.plugin(timestampPlugin);

// The "pre" hook is called before the "save" method is called on the schema
// Other hooks: pre, post
// Some methods: save, validate, remove, updateOne, deleteOne, deleteMany, find, findOne, findOneAndDelete, findOneAndRemove, findOneAndUpdate, update, updateMany, updateOne
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash password only if it is modified or new
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (err) {
      throw err;
    }
  }
});

// Virtual property - not stored in the database - Helper for get and set values
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// This is an instance method
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// This is a static method
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find({});
    return users;
  } catch (err) {
    throw err;
  }
};

// This is a model - a wrapper for the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
