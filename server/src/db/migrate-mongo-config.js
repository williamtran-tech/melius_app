const dotenv = require("dotenv");
dotenv.config({ path: "../../environments/.env.development" });
const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
const config = {
  mongodb: {
    url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
    databaseName: "melius_db",

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },
  migrationsDir: "seeders",
  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "commonjs",
};

module.exports = config;
