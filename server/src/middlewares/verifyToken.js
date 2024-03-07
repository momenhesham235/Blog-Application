const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");
const { ADMIN } = require("../utils/roles");

const verifyToken = (req, res, next) => {
  console.log(req.headers);
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
    console.log(req.user);
    next();
  } catch (err) {
    const error = AppError.create("invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
};

// verifyTokenAdmin
const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.role);
    if (req.user.role === ADMIN) {
      return next();
    }
    const error = AppError.create(
      "You don't have permission to perform this action",
      403
    );
    return next(error);
  });
};

// verifyTokenUser
const verifyTokenUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.id === req.params.id) {
      return next();
    }
    const error = AppError.create("not allowed, not your account", 403);
    return next(error);
  });
};

module.exports = {
  verifyTokenAdmin,
  verifyTokenUser,
};
