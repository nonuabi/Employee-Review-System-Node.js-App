const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
// Router for home page
router.get("/", passport.checkAuthentication, userController.home);
// Router for admin
router.use("/admin", require("./admin"));
// Router for users
router.use("/user", require("./user"));
// Router for review
router.use("/reviews", require("./review"));
module.exports = router;
