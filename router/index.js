const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/", passport.checkAuthentication, userController.home);
router.use("/user", require("./user"));
router.use("/review", require("./review"));
module.exports = router;
