const router = require("express").Router();
const {
  getUserProfile,
  getSingleUserProfile,
  getUserCount,
  updateUserProfile,
  profilePhotoUpload,
  deleteUserProfile,
} = require("../../controllers/user.controller");
const {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenUser,
  verifyTokenUserOrAdmin,
} = require("../../middlewares/verifyToken");
const photoUpload = require("../../middlewares/uploadPhoto");
const validationObjectId = require("../../middlewares/validationObjectId");

// Get User Profile
router.route("/").get(verifyTokenUser, getUserProfile);

// Update User Profile and Get Single User Profile
router
  .route("/:id")
  .get(validationObjectId, getSingleUserProfile)
  .patch(validationObjectId, verifyTokenUser, updateUserProfile)
  .delete(validationObjectId, verifyTokenUserOrAdmin, deleteUserProfile);

// upload profile photo
router
  .route("/profile-photo")
  .post(verifyToken, photoUpload.single("avatar"), profilePhotoUpload);

// Get count of users
router.route("/count").get(verifyTokenAdmin, getUserCount);

module.exports = router;
