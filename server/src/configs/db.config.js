const mongoose = require("mongoose");

exports.connectDatabase = () => {
  console.log(`Connecting to..`);
  mongoose.Promise = global.Promise;
  // Connecting to the database
  mongoose
    .connect(process.env.ATLAS_URI, {
      dbName: "melius_db",
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};
