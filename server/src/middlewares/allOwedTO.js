const AppError = require("../utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = AppError.create(
        "You don't have permission to perform this action",
        403
      );
      return next(error);
    }
    next();
  };
};
