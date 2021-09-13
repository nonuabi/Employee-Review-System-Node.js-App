module.exports.home = function (req, res) {
  return res.render("home");
};

// Sign In and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
