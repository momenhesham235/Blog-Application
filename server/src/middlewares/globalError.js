const { ERROR } = require("../utils/httpStatusText");

const globalError = (error, req, res, next) => {
  res.status(error.httpStatusCode || 500).send({
    status: error.StatusText || ERROR,
    error: error.message,
    code: error.httpStatusCode || 500,
    data: null,
  });
};

module.exports = globalError;
