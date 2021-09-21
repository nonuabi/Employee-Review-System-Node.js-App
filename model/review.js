const mongoose = require("mongoose");

// review Schema
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      require: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
