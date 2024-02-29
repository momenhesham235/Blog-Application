const getHome = (req, res) => {
  res.render("index.ejs");
};

module.exports = {
  getHome,
};
