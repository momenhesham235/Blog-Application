const asyncHandler = require("express-async-handler");
const getHome = asyncHandler(async (req, res) => {
  res.render("index");
});

module.exports = {
  getHome,
};
