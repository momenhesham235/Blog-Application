const path = require("path");
const multer = require("multer");
const AppError = require("../utils/appError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    if (file) {
      // extension will be added by multer
      const ext = file.mimetype.split("/")[1];
      //  random name
      const uniqueSuffix = `userAvatar-${Date.now()}.${ext}`;
      cb(null, uniqueSuffix);
    } else {
      cb(null, false);
    }
  },
});

const fileFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[0];
  if (ext === "image") {
    cb(null, true);
  } else {
    cb(AppError.create("Only image files are allowed", 400), false);
  }
};

const photoUpload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
  fileFilter: fileFilter,
});

module.exports = photoUpload;
