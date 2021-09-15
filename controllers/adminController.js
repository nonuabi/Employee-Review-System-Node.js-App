const User = require("../model/user");

module.exports.adminPage = async function (req, res) {
  console.log("admin page controller");
  if (!req.isAuthenticated()) {
    return res.redirect("/user/login");
  } else {
    if (req.user.isAdmin === false) {
      console.log("Not Admin");
      return res.redirect("/");
    } else {
      try {
        let user = await User.find({});
        var userList = [];
        for (let i = 0; i < user.length; i++) {
          var tmp = {
            name: user[i].name,
            id: user[i].id,
          };
          userList.push(tmp);
        }
        console.log(userList);
        return res.render("admin", {
          userList: userList,
        });
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
};

module.exports.setReviewers = async function (req, res) {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please Sign In");
    return res.redirect("/employees/signin");
  } else {
    let employee = await User.findById(req.user._id);
    if (employee.isAdmin == false) {
      console.log("Not Admin");
      req.flash("error", "Not valid access rights");
      return res.redirect("/");
    } else if (req.body.Reviewer == req.body.Recipient) {
      req.flash("error", "Same user in both fields");
      return res.redirect("back");
    } else {
      let reviewer = await User.findById(req.body.Reviewer);
      if (!reviewer) {
        req.flash("error", "Reviewer Not Valid");
        return res.redirect("back");
      }

      let recipient = await User.findById(req.body.Recipient);
      if (!recipient) {
        req.flash("error", "Recipient Not Valid");
        return res.redirect("back");
      }

      reviewer.to.push(recipient);
      reviewer.save();
      recipient.from.push(reviewer);
      recipient.save();
      req.flash("Reviewer Added");
      return res.redirect("back");
    }
  }
};
