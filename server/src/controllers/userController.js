"use strict";
const User = require("./../models/User");

exports.get_user = async (req, res) => {
  try {
    console.log(req.query.id);
    const user = await User.findById(req.query.id);
    res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "User not found",
      error: err,
    });
  }
};

exports.create_user = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({
      message: "User created",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "User not created",
      error: err,
    });
  }
};
