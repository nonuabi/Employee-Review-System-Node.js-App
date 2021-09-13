const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/", userController.home);
// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  userController.createSession
);
module.exports = router;
