const { ERROR } = require("../utils/httpStatusText");

const globalError = (error, req, res, next) => {
  res.status(error.httpStatusCode || 500).send({
    status: error.StatusText || ERROR,
    error: error.message,
    code: error.httpStatusCode || 500,
    stack: process.env.NODE_ENV === "production" ? null : error.stack, // for debugging  => get path of error
  });
};

module.exports = globalError;
