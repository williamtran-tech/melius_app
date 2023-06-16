const bcrypt = require("bcrypt");

module.exports = {
  async up(db, client) {
    const password = await bcrypt.hash("Asdfgh123!", 10);
    try {
      const data = [
        {
          email: "test@test.com",
          password: password,
          fullName: "Test User",
          phone: "1234567890",
          role: "admin",
          img: "",
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
        {
          email: "test1@gas.com",
          password: password,
          fullName: "Test User",
          phone: "1234267890",
          role: "admin",
          img: "",
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
      ];
      const users = await db.collection("users").insertMany(data);
      console.log(users);
      if (users.acknowledged) {
        console.log("Insert users successfully");
      }
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        console.log("Duplicate key error, skip seeding users");
      } else {
        console.log(err.message);
      }
    }
  },

  async down(db, client) {
    try {
      console.log("Delete users");
      const res = await db.collection("users").deleteMany({});
      console.log(res);
      if (res.acknowledged) {
        console.log("Deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
