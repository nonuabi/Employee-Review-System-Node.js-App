const User = require("../model/user");
const Review = require("../model/review");

module.exports.createReview = async function (req, res) {
  console.log("new Review");
  let recipient = await User.findById(req.params.id);
  if (!recipient) {
    console.log("recipient is invalid");
    return res.redirect("/");
  }
  // for (let i = 0; i < recipient.from.length; i++) {
  // if (recipient.from[i] === req.user.id) {
  let temp = await Review.create({
    to: recipient.id,
    from: req.body.id,
    review: req.body.review,
  });
  return res.status(200).send(temp);
  // }
  // }
  return res.status(500).send("not created");
};
