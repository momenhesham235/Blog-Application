const router = require("express").Router();
const { getUserProfile } = require("../../controllers/user.controller");
const allOwedTO = require("../../middlewares/allOwedTO");
const verifyToken = require("../../middlewares/verifyToken");
const { ADMIN } = require("../../utils/roles");

router.get("/", verifyToken, allOwedTO(ADMIN), getUserProfile);

module.exports = router;
