const router = require("express").Router();

const {
  createPost,
  getAllPosts,
  getSinglePost,
  getPostCount,
  deletePost,
  updatePost,
  updatePostImage,
  toggleLike,
} = require("../../controllers/post.controller");

const { verifyToken } = require("../../middlewares/verifyToken");
const photoUpload = require("../../middlewares/uploadPhoto");
const validationObjectId = require("../../middlewares/validationObjectId");

router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPost)
  .get(getAllPosts);

router.route("/count").get(getPostCount);

router
  .route("/:id")
  .get(validationObjectId, getSinglePost)
  .delete(validationObjectId, verifyToken, deletePost)
  .patch(validationObjectId, verifyToken, updatePost);

router
  .route("/image-update/:id")
  .patch(
    validationObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImage
  );

router.route("/like/:id").patch(validationObjectId, verifyToken, toggleLike);

module.exports = router;
