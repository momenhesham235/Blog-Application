const homeRouter = require("./router/home.router");
const notFound = require("./router/notFound.router");
const globalError = require("../middlewares/globalError");
const mainRouters = (app) => {
  app.use("/", homeRouter);
  // not found route
  app.use("*", notFound);

  // global error handler
  app.use(globalError);
};

module.exports = mainRouters;
