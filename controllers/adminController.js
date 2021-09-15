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
