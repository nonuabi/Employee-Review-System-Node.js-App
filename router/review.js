const express = require("express");
const router = express.Router();
const passport = require("passport");
const reviewController = require("../controllers/reviewController");

router.get("/newReview/:id", reviewController.newReview);

module.exports = router;
