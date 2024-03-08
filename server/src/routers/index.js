const homeRouter = require("./router/home.router");
const authRouter = require("./router/auth.router");
const userRouter = require("./router/user.router");
const postRouter = require("./router/post.router");
const commentRouter = require("./router/comment.router");
const notFound = require("./router/notFound.router");
const globalError = require("../middlewares/globalError");
const mainRouters = (app) => {
  app.use("/", homeRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/comment", commentRouter);
  // not found route
  app.use("*", notFound);

  // global error handler
  app.use(globalError);
};

module.exports = mainRouters;
