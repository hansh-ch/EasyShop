const { isValidObjectId } = require("mongoose");

function checkID(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return res.status(200).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
}
module.exports = checkID;
