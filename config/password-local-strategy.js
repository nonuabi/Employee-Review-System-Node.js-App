const User = require("../model/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find the user and establish the identiy
      User.findOne({ email }, function (err, user) {
        if (err) {
          console.log("Error in finding the user : passport : ", err);
          return done(err);
        }
        if (!user || user.password !== password) {
          console.log("Invalid username/password");
          done(null, false);
        }
        done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById({ id }, function (err, user) {
    if (err) {
      console.log("Error in finding User : passport : ", err);
      return;
    }
    return done(null, user);
  });
});

module.exports = passport;
