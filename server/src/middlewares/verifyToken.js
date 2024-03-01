const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    const error = AppError.create(
      "unauthorized access",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const User = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // create new user in request
    req.user = User;
    next();
  } catch (err) {
    const error = AppError.create("invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
