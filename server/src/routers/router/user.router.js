const router = require("express").Router();
const {
  getUserProfile,
  getSingleUserProfile,
  getUserCount,
  updateUserProfile,
} = require("../../controllers/user.controller");
const {
  verifyTokenAdmin,
  verifyTokenUser,
} = require("../../middlewares/verifyToken");
const validationObjectId = require("../../middlewares/validationObjectId");

router.get("/", verifyTokenAdmin, getUserProfile);

router.get("/count", verifyTokenAdmin, getUserCount);

router
  .route("/:id")
  .get(validationObjectId, getSingleUserProfile)
  .patch(validationObjectId, verifyTokenUser, updateUserProfile);

module.exports = router;
