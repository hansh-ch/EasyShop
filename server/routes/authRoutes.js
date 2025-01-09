const express = require("express");
const { protectAuth } = require("../middlewares/protectAuthMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(protectAuth, logoutUser);

module.exports = router;
