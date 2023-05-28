const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

var userProfile;
// This function is called when passport needs to save the user data into the session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// This function is called when passport needs to read the user data from the session
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Google OAuth
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}:${process.env.PORT}/api/v1/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Callback function after successful authentication
      // Here, you can access the user's profile and perform further actions
      // or store the user data in your application's database.
      userProfile = profile;
      userProfile.accessToken = accessToken;
      return done(null, userProfile);
    }
  )
);

module.exports = passport;
