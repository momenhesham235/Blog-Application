class AppError extends Error {
  constructor() {
    super();
  }
  create(message, httpStatusCode, StatusText) {
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.StatusText = StatusText;
    return this;
  }
}

module.exports = new AppError();
