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
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyTokenAndAuthorization,
} = require("../../middlewares/verifyToken");
const photoUpload = require("../../middlewares/uploadPhoto");
const validationObjectId = require("../../middlewares/validationObjectId");

// Get User Profile
router.route("/").get(verifyTokenAndAdmin, getUserProfile);

// Update User Profile and Get Single User Profile
router
  .route("/:id")
  .get(validationObjectId, getSingleUserProfile)
  .patch(validationObjectId, verifyTokenAndOnlyUser, updateUserProfile)
  .delete(validationObjectId, verifyTokenAndAuthorization, deleteUserProfile);

// upload profile photo
router
  .route("/profile-photo")
  .post(verifyToken, photoUpload.single("avatar"), profilePhotoUpload);

// Get count of users
router.route("/count").get(verifyTokenAndAdmin, getUserCount);

module.exports = router;
