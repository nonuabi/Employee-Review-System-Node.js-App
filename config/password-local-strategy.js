const User = require("../model/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne(
        {
          email: email,
        },
        function (err, user) {
          if (err) {
            console.error.bind("Error", err);
            return done(err);
          }
          if (!user) {
            console.log("Wrong Username");
            return done(null, false, { message: "User Not Found!!" });
          }
          if (user.password != password) {
            console.log("Wrong Password");
            return done(null, false, { message: "Password not Valid" });
          }
          return done(null, user);
        }
      );
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user._id.toString());
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById({ _id: id }, function (err, user) {
    if (err) {
      console.log("Error in finding User : passport : ", err);
      return done(err);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  //if the user is sign in then, pass on the request to
  // the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not sign in
  return res.redirect("/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //res.user contains the current signed in user from the session cookie
    //and we are just sending this to the local for the views
    res.locals.user = req.user;
    console.log("res.locals ", res.locals);
  }
  next();
};

module.exports = passport;
