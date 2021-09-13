const User = require("../model/user");

module.exports.home = function (req, res) {
  return res.render("home");
};

module.exports.login = function (req, res) {
  return res.render("login");
};

module.exports.signup = function (req, res) {
  return res.render("signup");
};

// create new user
module.exports.create = async function (req, res) {
  console.log("create user");
  try {
    if (req.body.passpord !== req.body.confirmPassword) {
      let check_user = await User.findOne({ email });
      console.log(" ::: ", check_user);
      return res.render("signup");
    } else {
      console.log("Password && Confirm Password do not match");
      return res.render("signup");
    }
  } catch (err) {
    console.log("Error while creating new user :: ", err);
    return res.render("home");
  }
};

// Sign In and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
