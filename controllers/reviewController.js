const User = require("../model/user");
const Review = require("../model/review");

// add new review
module.exports.newReview = async function (req, res) {
  console.log("new Review Controller :: ", req);
  let recipient = await User.findById(req.params.id);
  if (!recipient) {
    console.log("recipient is not valid");
    return res.redirect("/");
  }
  console.log("recipient :: ", recipient.from.length);
  for (let i = 0; i < recipient.from.length; i++) {
    if (req.user) {
      if (recipient.from[i] == req.user.id) {
        const new_review = await Review.create({
          to: recipient.id,
          from: req.user.id,
          review: req.query.newReview,
        });
        console.log("new Review :: ", new_review);
        if (new_review) {
          await new_review.save();
        } else {
          console.log("new Review is not created");
        }

        return res.redirect("/");
      }
    } else {
      console.log("user is not loggin");
      return res.redirect("/user/login");
    }
  }
  return res.redirect("/");
};
