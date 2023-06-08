import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";

const envPath = path.resolve(
  __dirname,
  "../../..",
  "environments",
  ".env.development"
);
dotenv.config({
  path: envPath,
});

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
      userProfile = profile;
      userProfile.accessToken = accessToken;
      console.log("userProfile:", userProfile);
      return done(null, userProfile);
    }
  )
);

export default passport;
