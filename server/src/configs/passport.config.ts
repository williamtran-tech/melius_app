import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";

let envPath;
// envPath = path.resolve(
//   __dirname,
//   "../../..",
//   "environments",
//   ".env.development"
// );
// dotenv.config({
//   path: envPath,
// });
// console.log("ENV PATH 1: ", envPath);

envPath = path.resolve(
  __dirname,
  ".env.development"
);
dotenv.config({
  path: envPath,
});
console.log("ENV PATH 2: ", envPath);

if (process.env.STATUS === "production") {
  require("dotenv").config({
    path: path.resolve(
      __dirname,
      ".env.development"
    ),
  });

  console.log("Passport ENV Production: ", process.env.STATUS);
} else if (process.env.STATUS === "development") {
  // This for migration
  envPath = path.resolve(
    __dirname,
    "../../..",
    "environments",
    ".env.development"
  );
  require("dotenv").config({
    path: envPath,
  });

  // This for server - dist
  envPath = path.resolve(
    "environments",
    ".env.development"
  );
  require("dotenv").config({
    path: envPath,
  });

  console.log("Passport ENV Development: ", process.env.STATUS);
}

let userProfile: any;
// This function is called when passport needs to save the user data into the session
passport.serializeUser(function (user: any, done) {
  done(null, user);
});

// This function is called when passport needs to read the user data from the session
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

// Google OAuth
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.CALLBACK_URL}:${process.env.PORT}/api/v1/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Callback function after successful authentication
      // Here, you can access the user's profile and perform further actions
      // or store the user data in your application's database.
      userProfile = profile._json;
      userProfile.accessToken = accessToken;
      userProfile.refreshToken = refreshToken;
      console.log("Passport: ", refreshToken);
      // Should store the refresh token to db for future use
      // The refresh token can be used to generate new access tokens if they expire
      return done(null, userProfile);
    }
  )
);

export default passport;
