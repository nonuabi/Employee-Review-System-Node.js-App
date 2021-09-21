const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/adminController");

// get admin page
router.get(
  "/admin-page",
  passport.checkAuthentication,
  adminController.adminPage
);

// set review to employees
router.post(
  "/setReviewers",
  passport.checkAuthentication,
  adminController.setReviewers
);
// make new admin
router.post(
  "/newAdmin",
  passport.checkAuthentication,
  adminController.newAdmin
);
// view employees list
router.get(
  "/view-employees",
  passport.checkAuthentication,
  adminController.viewEmployees
);
// delete employee
router.get(
  "/delete-employee/:id",
  passport.checkAuthentication,
  adminController.deleteEmployee
);

module.exports = router;
