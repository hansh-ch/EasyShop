const express = require("express");
const path = require("path");
const multer = require("multer");
const appError = require("../utils/appError");

const router = express.Router();

// ==> Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${extName}`;
    cb(null, fileName);
  },
});

// ==> file filter

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb("error", false);
  }
};

const upload = multer({ storage: storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res, next) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      next(appError("upload image failed", 500));
    } else if (req.file) {
      res.status(200).json({
        status: "success",
        message: "Image upload successfully",
        data: `/${req.file.path}`,
      });
    } else {
      next(appError("No file provided", 500));
    }
  });
});
module.exports = router;
