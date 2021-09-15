const User = require("../model/user");

module.exports.adminPage = async function (req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/employees/signin");
  } else {
    if (req.user.isAdmin == false) {
      console.log("Not Admin");
      return res.redirect("/");
    } else {
      try {
        let user = await User.find({});
        var employeeList = [];
        for (let i = 0; i < user.length; i++) {
          var tmp = {
            name: user[i].name,
            id: user[i].id,
          };
          employeeList.push(tmp);
        }
        console.log(employeeList);
        return res.render("admin", {
          employeeList: employeeList,
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
    return res.redirect("/user/login");
  } else {
    let employee = await User.findById(req.user._id);
    if (employee.isAdmin == false) {
      console.log("Not Admin");
      return res.redirect("/");
    } else if (req.body.Reviewer == req.body.Recipient) {
      return res.redirect("back");
    } else {
      let reviewer = await User.findById(req.body.Reviewer);
      if (!reviewer) {
        return res.redirect("back");
      }

      let recipient = await User.findById(req.body.Recipient);
      if (!recipient) {
        return res.redirect("back");
      }

      reviewer.to.push(recipient);
      reviewer.save();
      recipient.from.push(reviewer);
      recipient.save();
      return res.redirect("back");
    }
  }
};
