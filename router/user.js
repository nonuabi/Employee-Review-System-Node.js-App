const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get("/login", userController.login);
router.get("/signup", userController.signup);
router.get("/signout", userController.deleteSession);
router.post("/create-user", userController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/login" }),
  userController.createSession
);
module.exports = router;
