const User = require("../model/user");
const Review = require("../model/review");

module.exports.createReview = async function (req, res) {
  let recipient = await User.findById(req.params.id);
  if (!recipient) {
    console.log("recipient is invalid");
    return res.redirect("/");
  }
  for (let i = 0; i < recipient.from.length; i++) {
    if (recipient.from[i] === req.user.id) {
      await Review.create({
        to: recipient.id,
        from: req.user._id,
        review: req.body.review,
      });
      return res.redirect("back");
    }
  }
  return res.redirect("back");
};
