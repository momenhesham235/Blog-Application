const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const mainRoutes = require("./src/routers");

// config
dotenv.config({
  path: "src/config/.env",
});
const db = require("./src/config/db");

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src", "views"));

// API Routes

mainRoutes(app);

const port = process.env.PORT || 5000;

// Server Listen
app.listen(port, () => {
  try {
    console.log(`Server running on port http://localhost:${port}`);
  } catch (error) {
    console.log(error);
    console.log("Server not running");
    process.exit(1);
  }
});
