const router = require("express").Router();

const { getHome } = require("../../controllers/home.controller");

router.get("/", getHome);

module.exports = router;
