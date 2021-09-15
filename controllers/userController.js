const User = require("../model/user");
const Review = require("../model/review");
const uniqid = require("uniqid");
module.exports.home = async function (req, res) {
  console.log("req.user  :: ", req.user);
  if (!req.user) {
    return res.redirect("/user/login");
  }
  let employee = await User.findById(req.user._id);
  console.log("employee ::: ", employee);
  let review = await Review.find({
    to: req.user._id,
  });
  let recipients = [];
  for (let i = 0; i < employee.to.length; i++) {
    let temp = await User.findById(employee.to[i]);
    recipients.push(temp);
  }

  let reviews = [];
  for (let i = 0; i < review.length; i++) {
    let temp = await User.findById(review[i].from);
    console.log("review :", temp);
    let currentReview = {
      name: temp.name,
      review: review[i].review,
      updated: review[i].updatedAt,
    };
    reviews.push(currentReview);
  }

  return res.render("home", {
    recipients: recipients,
    reviews: reviews,
  });
};

module.exports.login = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.render("login");
  } else {
    console.log("already Login");
  }
  return res.redirect("/");
};

module.exports.signup = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.render("signup");
  }
  return res.redirect("/");
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
        return res.redirect("/user/login");
      } else {
        const currentEmployees = await User.find({});
        const new_user = await User.create({
          employeeID: currentEmployees.length + 12101000,
          name,
          email,
          password,
          confirmPassword,
        });
        if (!new_user) {
          console.log("Error while creating ");
          return res.redirect("/user/signup");
        } else {
          console.log("new User :: ", new_user);
        }
      }
      return res.redirect("/user/login");
    } else {
      console.log("Password && Confirm Password do not match");
      return res.redirect("/user/signup");
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
  console.log("logout");
  return res.redirect("/");
};
