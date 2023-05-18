"use strict";
const User = require("./../models/User");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user !== null && req.body.password) {
      const isMatch = await user.comparePassword(req.body.password);
      console.log(req.body.password, isMatch);
      if (!isMatch) {
        res.status(400).json({
          message: "Invalid credentials",
        });
      } else {
        res.status(200).json({
          message: "User logged in",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

exports.get_user = async (req, res) => {
  try {
    const users = await User.find({});

    // Static method
    const staUsers = await User.getUsers();
    console.log("Static method: ", staUsers);

    console.log("This is not static", users);
    res.status(200).json({
      message: "User found",
      user: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "User not found",
      error: err,
    });
  }
};

exports.get_user_details = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "User not found",
    });
  }
};

exports.create_user = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({
      message: "User created",
      user: user.fullName,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      res.status(400).json({
        message: "User not found",
        error: err,
      });
    }
  }
};

exports.update_user = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;

      await user.save();
      res.status(200).json({
        message: "User updated",
        user: user.fullName,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
