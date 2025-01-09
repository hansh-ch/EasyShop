const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const User = require("../models/userModel");
const { createToken } = require("../utils/jwtToken");

/*====>
    desc   ==> creating user
    route  ==> auth/register
    access ==> public
<=====*/

const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  if (!username || !email || !password) {
    return next(appError("All fields are required", 500));
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(appError("User already exists", 500));
  }
  const user = await User.create({ username, email, password, isAdmin });
  res.status(200).json({
    status: "success",
    message: "User signed-up successfully",
  });
});

/*====>
    desc   ==> login user
    route  ==> auth/login
    access ==> public
<=====*/

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appError("All fields are required", 500));
  }
  const userExists = await User.findOne({ email });

  const hashedPassword = await bcrypt.compare(password, userExists.password);
  if (!userExists || !hashedPassword) {
    return next(appError("Incorrect email or password", 500));
  }
  const user = await User.findById(userExists._id).select("-password -__v");
  const token = createToken(user._id, res);
  res.status(200).json({
    status: "success",
    message: "user logged in successfully",
    data: user,
  });
});
/*====>
    desc   ==> logout user
    route  ==> auth/logout
    access ==> public
<=====*/

const logoutUser = catchAsync(async (req, res, next) => {
  if (!req.user) return next(appError("Cannot logout", 500));
  res.clearCookie("token", "");
  res.status(200).json({
    status: "success",
    message: "user logged out successfully",
  });
});
module.exports = { registerUser, loginUser, logoutUser };
