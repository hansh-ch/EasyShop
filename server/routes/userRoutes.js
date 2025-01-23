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
  getUserDetailById,
  updateUserDetailByAdmin,
} = require("../controllers/userContollers");

const router = express.Router();

router.route("/").get(protectAuth, adminProtect, getAllUsers);
router
  .route("/profile")
  .get(protectAuth, getUserDetails)
  .put(protectAuth, updateUserDetails);
router
  .route("/:id")
  .delete(protectAuth, adminProtect, deleteUser)
  .get(protectAuth, adminProtect, getUserDetailById)
  .put(protectAuth, adminProtect, updateUserDetailByAdmin);

module.exports = router;
