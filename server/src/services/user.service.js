const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const users = await User.getUsers();
  return users;
};

module.exports = {
  getAllUsers,
};
