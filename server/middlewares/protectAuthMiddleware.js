const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const User = require("../models/userModel");

const protectAuth = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(appError("You are not logged in", 401));
  }
  // token Verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //Checking if user still exists
  const currentUser = await User.findById(decoded.id).select("-password");
  if (!currentUser) {
    return next(
      new appError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const adminProtect = catchAsync(async (req, res, next) => {
  if (!req.user) return next(appError("You are not authorized", 401));
  const isAdmin = req?.user.isAdmin;
  if (!isAdmin) {
    return next(appError("You are not allowed to access", 401));
  }
  next();
});
module.exports = { protectAuth, adminProtect };
