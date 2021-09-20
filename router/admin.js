const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/adminController");

router.get(
  "/admin-page",
  passport.checkAuthentication,
  adminController.adminPage
);
router.post(
  "/setReviewers",
  passport.checkAuthentication,
  adminController.setReviewers
);
router.post(
  "/newAdmin",
  passport.checkAuthentication,
  adminController.newAdmin
);
router.post("/view-employees", adminController.viewEmployees);

module.exports = router;
