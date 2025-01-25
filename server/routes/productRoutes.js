const express = require("express");
const checkID = require("../middlewares/checkID");
const {
  protectAuth,
  adminProtect,
} = require("../middlewares/protectAuthMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProducts,
  getProductById,
  createReview,
  fetchTopProducts,
  fetchNewProducts,
} = require("../controllers/productController");

const router = express.Router();

router.use(protectAuth, adminProtect);
router.route("/").post(createProduct).get(fetchProducts);
router.route("/lists").get(fetchAllProducts);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);
router
  .route("/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductById);
router.route("/:id/reviews").post(createReview);
module.exports = router;
