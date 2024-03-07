const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
