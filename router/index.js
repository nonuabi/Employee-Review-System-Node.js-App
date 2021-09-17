const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
router.get("/", passport.checkAuthentication, userController.home);
router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/reviews", require("./review"));
module.exports = router;
