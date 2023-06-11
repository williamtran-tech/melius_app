module.exports = {
  async up(db, client) {
    try {
      const data = [
        {
          email: "test@test.com",
          password: "Asdfg123!",
          fullName: "Test User",
          phone: "1234567890",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
        {
          email: "test1@gas.com",
          password: "Asdfg123!",
          fullName: "Test User",
          phone: "1234267890",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
      ];
      const users = await db.collection("users").insertMany(data);
      if (users.acknowledged) {
        console.log("Insert users successfully");
      }
    } catch (err) {
      if (err.code === 11000) {
        console.log("Duplicate key error, skip seeding users");
        return;
      } else {
        console.log(err.message);
        return;
      }
    }
  },

  async down(db, client) {
    console.log("Delete users");
    const res = await db.collection("users").deleteMany({});
    console.log(res);
    if (res.acknowledged) {
      console.log("Deleted successfully");
    }
  },
};
