const asyncWrapper = require("../middlewares/asyncWrapper");

const getHome = asyncWrapper(async (req, res) => {
  res.render("index");
});

module.exports = {
  getHome,
};
