const notFound = (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
    data: null,
  });
};

module.exports = notFound;
