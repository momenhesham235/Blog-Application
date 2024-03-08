const router = require("express").Router();

const {
  createComment,
  getAllComments,
  deleteComment,
} = require("../../controllers/comment.controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");
const validationObjectId = require("../../middlewares/validationObjectId");

router
  .route("/")
  .post(verifyToken, createComment)
  .get(verifyTokenAndAdmin, getAllComments);

router.route("/:id").delete(validationObjectId, verifyToken, deleteComment);

module.exports = router;
