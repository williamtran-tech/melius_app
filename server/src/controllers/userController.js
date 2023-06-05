"use strict";
const User = require("./../models/User");
const UserServices = require("./../services/user.service");

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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserServices.getAllUsers();
    if (users.length !== 0) {
      res.status(200).json({
        message: "Users found",
        users: users,
      });
    } else {
      res.status(404).json({
        message: "Users not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// The below code needs to be refactored to use the UserServices for interacting with the database

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
    console.log(err.message);
    if (err.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      res.status(400).json({
        message: "User not found",
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
