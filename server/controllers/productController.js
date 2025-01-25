const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Product = require("../models/productModel");

/*====>
    desc   ==> create product
    route  ==> POST ==> api/product
    access ==> private(admin)
<=====*/

const createProduct = catchAsync(async (req, res, next) => {
  const {
    title,
    brand,
    image,
    description,
    inStocks,
    price,
    reviews,
    rating,
    numReviews,
    category,
  } = req.body;

  const product = await Product.create({
    title,
    brand,
    image,
    description,
    inStocks,
    price,
    reviews,
    rating,
    numReviews,
    category,
  });
  res.status(200).json({
    status: "success",
    message: "Product created successfully",
  });
});

/*====>
    desc   ==> update product
    route  ==> PUT ==> api/product/:id
    access ==> private(admin)
<=====*/

const updateProduct = catchAsync(async (req, res, next) => {
  const {
    title,
    brand,
    image,
    description,
    inStocks,
    price,
    reviews,
    rating,
    numReviews,
    category,
  } = req.body;

  const exists = await Product.findById(req.params.id);
  if (!exists) return next(appError("Product doesnot exist", 500));
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title,
      brand,
      image,
      description,
      inStocks,
      price,
      reviews,
      rating,
      numReviews,
      category,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: product,
  });
});

/*====>
    desc   ==> delete product
    route  ==> DELETE ==> api/product/:id
    access ==> private(admin)
<=====*/
const deleteProduct = catchAsync(async (req, res, next) => {
  const exists = await Product.findById(req.params.id);
  if (!exists) return next(appError("Product doesnot exist", 500));
  const data = await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

/*====>
    desc   ==> fetch all products
    route  ==> GET ==> api/product/lists
    access ==> private
<=====*/
const fetchProducts = catchAsync(async (req, res, next) => {
  const pageSize = 6;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const data = await Product.find({ ...keyword }).limit(pageSize);
  if (!data) return next(appError("Products cannot be found", 500));
  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data,
  });
});

/*====>
    desc   ==> fetch single product
    route  ==> GET ==> api/product/id
    access ==> private
<=====*/
const getProductById = catchAsync(async (req, res, next) => {
  const exists = await Product.findById(req.params.id).populate("category");
  if (!exists) return next(appError("Product not found", 500));
  res.status(200).json({
    status: "success",
    message: "Product found successfully",
    data: exists,
  });
});

/*====>
    desc   ==> fetch all products
    route  ==> GET ==> api/product/lists
    access ==> private
<=====*/
const fetchAllProducts = catchAsync(async (req, res, next) => {
  const data = await Product.find()
    .populate("category")
    .limit(12)
    .sort({ createdAt: -1 });
  if (!data) return next(appError("Products cannot be found", 500));
  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data,
  });
});

/*====>
    desc   ==> fetch top products
    route  ==> GET ==> api/product/new
    access ==> private
<=====*/

const fetchTopProducts = catchAsync(async (req, res, next) => {
  const topProducts = await Product.find().sort({ rating: -1 }).limit(8);
  res.status(200).json({
    status: "success",
    message: "Top Products fetched successfully",
    data: topProducts,
  });
});

/*====>
    desc   ==> fetch new products
    route  ==> GET ==> api/product/new
    access ==> private
<=====*/

const fetchNewProducts = catchAsync(async (req, res, next) => {
  const newProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
  res.status(200).json({
    status: "success",
    message: "New products fetched successfully",
    data: newProducts,
  });
});
/*====>
    desc   ==> create review
    route  ==> POST ==> api/product/id/review
    access ==> private
<=====*/
const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return next(appError("Cannot find product", 500));

  const reviewExists = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (reviewExists) return next(appError("Product already reviewed", 400));
  const review = {
    name: req.user.username,
    ratings: +rating,
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, curr) => acc + curr.ratings, 0) /
    product.reviews.length;
  await product.save();

  res.status(200).json({
    status: "success",
    message: "Review created successfully",
    data: product,
  });
});
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
  getProductById,
  fetchProducts,
  createReview,
  fetchTopProducts,
  fetchNewProducts,
};
