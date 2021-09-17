const User = require("../model/user");
const Review = require("../model/review");
module.exports.newReview = async function (req, res) {
  console.log("new Review Controller :: ", req);
  let recipient = await User.findById(req.params.id);
  if (!recipient) {
    console.log("recipient is not valid");
    return res.redirect("/");
  }

  for (let i = 0; i < recipient.from.length; i++) {
    if (recipient.from[i] === req.user.id) {
      await Review.create({
        to: recipient.id,
        from: req.user.id,
        review: req.query.newReview,
      });
      return res.redirect("/");
    }
  }
  return res.redirect("/");
};
