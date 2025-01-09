const express = require("express");
const {
  protectAuth,
  adminProtect,
} = require("../middlewares/protectAuthMiddleware");
const {
  getAllUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser,
} = require("../controllers/userContollers");

const router = express.Router();

router.route("/").get(protectAuth, adminProtect, getAllUsers);
router
  .route("/profile")
  .get(protectAuth, getUserDetails)
  .put(protectAuth, updateUserDetails);
router.route("/:id").delete(protectAuth, adminProtect, deleteUser);

module.exports = router;
