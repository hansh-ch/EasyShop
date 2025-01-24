const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

/*====>
    desc   ==> create category
    route  ==> POST==> api/category
    access ==> private (admin)
<=====*/

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(appError("Name is required", 500));
  }
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return next(appError("Category already exists", 500));
  }
  const category = await Category.create({ name });
  res.status(200).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
});

/*====>
    desc   ==> update category
    route  ==> PUT ==> api/category/id
    access ==> private (admin)
<=====*/
const updateCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(appError("Name is required", 500));
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
});

/*====>
    desc   ==> delete category
    route  ==> DELETE ==> api/category/id
    access ==> private (admin)
<=====*/
const deleteCategory = catchAsync(async (req, res, next) => {
  const exists = await Category.findById(req.params.id);
  if (!exists) return next(appError("Category doesn't exist", 500));
  const data = await Category.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
});

/*====>
    desc   ==> get all category
    route  ==> GET ==> api/category/lists
    access ==> private (admin)
<=====*/
const getAllCategories = catchAsync(async (req, res, next) => {
  const data = await Category.find();
  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data,
  });
});

/*====>
    desc   ==> get category by id
    route  ==> GET ==> api/category/id
    access ==> private (admin)
<=====*/
const getCategoryByID = catchAsync(async (req, res, next) => {
  const data = await Category.findById(req.params.id);
  if (!data) return next(appError("Cannot find category", 500));
  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data,
  });
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByID,
};
