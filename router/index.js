const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.home);
router.use("/user", require("./user"));

module.exports = router;
