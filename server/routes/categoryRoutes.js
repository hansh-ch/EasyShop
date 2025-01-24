const express = require("express");
const {
  protectAuth,
  adminProtect,
} = require("../middlewares/protectAuthMiddleware");

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByID,
} = require("../controllers/categoryController");

const router = express.Router();

//====> Routes
router.use(protectAuth, adminProtect);
router.route("/lists").get(getAllCategories);
router.route("/").post(createCategory);
router
  .route("/:id")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategoryByID);

module.exports = router;
