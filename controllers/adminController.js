const User = require("../model/user");

// admin page controller
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

// set reviews for employess
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

// make new admin
module.exports.newAdmin = async function (req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/user/login");
  }
  if (req.user.isAdmin == true) {
    let employee = await User.findById(req.body.newAdmin);

    if (!employee) {
      return res.redirect("back");
    }
    if (employee.isAdmin == true) {
      return res.redirect("back");
    }
    if (employee.isAdmin == false) {
      employee.isAdmin = true;
      employee.save();

      return res.redirect("/admin/admin-page");
    }
  }
};

// view employess
module.exports.viewEmployees = async function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      let employees = await User.find({});
      console.log(employees);
      if (employees) {
        return res.render("employees", {
          employees: employees,
        });
      }
    } else {
      console.log("user is not authorized check list of Employees ");
      return res.redirect("/");
    }
  } else {
    console.log("user not authenticated");
    return res.redirect("/user/login");
  }
};

// delete employee
module.exports.deleteEmployee = async function (req, res) {
  console.log("delete Request :: ", req.params);
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      await User.deleteOne({ _id: req.params.id });
      return res.redirect("/admin/view-employees");
    }
  }
};
