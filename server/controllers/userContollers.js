const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/*====>
    desc   ==> get all user
    route  ==> GET==> api/users
    access ==> private
<=====*/
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(appError("No users found", 500));
  res.status(200).json({
    status: "success",
    message: "Users found succesfully",
    data: users,
  });
});

/*====>
    desc   ==> user profile
    route  ==> GET==> api/users/profile
    access ==> private
<=====*/

const getUserDetails = catchAsync(async (req, res, next) => {
  if (!req.user) return next(appError("You are not logged in", 401));
  const user = await User.findById(req.user._id).select("-password -__v");
  res.status(200).json({
    status: "success",
    message: "user found successfully",
    data: user,
  });
});

/*====>
    desc   ==> update user details
    route  ==> POST==> api/users/profile
    access ==> private
<=====*/

const updateUserDetails = catchAsync(async (req, res, next) => {
  if (!req.user) return next(appError("You are not logged in", 401));
  const { username, email, password } = req.body;

  let user;
  // want to change password
  if (password) {
    const hashedPwd = bcrypt.hashSync(password, 10);
    user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, password: hashedPwd },
      {
        new: true,
      }
    ).select("-password -__v");
  }
  user = await User.findByIdAndUpdate(
    req.user._id,
    { username, email },
    {
      new: true,
    }
  ).select("-password -__v");

  if (!user) return next(appError("No user found", 500));
  res.status(200).json({
    status: "success",
    message: "user updated  successfully",
    data: user,
  });
});

/*====>
    desc   ==> delete user 
    route  ==> POST==> api/users/id
    access ==> private ==>only admin
<=====*/

const deleteUser = catchAsync(async (req, res, next) => {
  // checking if user exists
  const userExists = await User.findById(req.params.id);
  if (!userExists) return next(appError("User doesn't exist", 500));
  const user = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    message: "user deleted successfully",
  });
});

/*====>
    desc   ==> user detail 
    route  ==> POST==> api/users/id
    access ==> private ==>only admin
<=====*/

const getUserDetailById = catchAsync(async (req, res, next) => {
  // checking if user exists
  const user = await User.findById(req.params.id).select("-password -__v");
  res.status(200).json({
    status: "success",
    message: "user found successfully",
    data: user,
  });
});

/*====>
    desc   ==> update user detail
    route  ==> POST==> api/users/id
    access ==> private (admin)
<=====*/

const updateUserDetailByAdmin = catchAsync(async (req, res, next) => {
  if (!req.user) return next(appError("You are not logged in", 401));
  const { username, email, isAdmin } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, isAdmin },
    {
      new: true,
    }
  ).select("-password -__v");

  if (!user) return next(appError("No user found", 500));
  res.status(200).json({
    status: "success",
    message: "user updated  successfully",
    data: user,
  });
});
module.exports = {
  getAllUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  getUserDetailById,
  updateUserDetailByAdmin,
};
