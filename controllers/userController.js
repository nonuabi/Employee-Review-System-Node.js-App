const User = require("../model/user");
const uniqid = require("uniqid");
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
  const { name, email, password, confirmPassword } = req.body;
  console.log("email :: ", email);
  console.log("password :: ", password);
  console.log("confirmPassword :: ", confirmPassword);
  try {
    if (password === confirmPassword) {
      let check_user = await User.findOne({ email: email });
      if (check_user) {
        console.log("Email id is already registred");
        return res.redirect("/login");
      } else {
        const new_user = await User.create({
          employeeID: uniqid(),
          name,
          email,
          password,
          confirmPassword,
        });
        if (!new_user) {
          console.log("Error while creating ");
          return res.redirect("/signup");
        } else {
          console.log("new User :: ", new_user);
        }
      }
      return res.redirect("/login");
    } else {
      console.log("Password && Confirm Password do not match");
      return res.redirect("/signup");
    }
  } catch (err) {
    console.log("Error while creating new user :: ", err);
    return res.redirect("/home");
  }
};

// Sign In and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.deleteSession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
