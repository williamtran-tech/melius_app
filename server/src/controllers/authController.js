const passport = require("./../configs/passport.config");
var userProfile;

const googleLogin = (req, res) => {
  // Handle login logic
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};
const callback = (req, res, next) => {
  // Handle the callback logic after Google authentication
  passport.authenticate("google", {
    successRedirect: `${process.env.CALLBACK_URL}:${process.env.PORT}/api/v1/auth/google/success`, // Redirect to the success page
    failureRedirect: `${process.env.CALLBACK_URL}:${process.env.PORT}/api/v1/auth/google/error`, // Redirect to the failure page
  })(req, res, next);
};

const success = (req, res) => {
  if (!req.user) {
    res.status(404).json({
      err: "Not found",
    }); // Redirect to login page
  }
  // Handle the successful Google authentication
  userProfile = req.user;
  res.json({
    message: "Login success",
    user: userProfile,
  });
};

const error = (req, res) => {
  // Handle the failed Google authentication
  console.log(req.error);
  res.json({
    message: "Login failed",
  });
};

function logout(req, res) {
  // Handle logout logic
  req.logout();
  res.redirect("/login"); // Redirect to the login page
}

module.exports = {
  googleLogin,
  callback,
  success,
  error,
  logout,
};
