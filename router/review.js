const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get("/create-review/:id", reviewController.createReview);

module.exports = router;
