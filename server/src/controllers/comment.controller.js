const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const {
  validateCreateComment,
} = require("../utils/validation/commentValidation");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");
const { ADMIN } = require("../utils/roles");

/**-----------------------------------------------
 * @desc    Create New Comment
 * @route   /api/comment
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
const createComment = asyncHandler(async (req, res) => {
  // validate request body
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: FAIL, message: error.details[0].message });
  }

  //   get user profile
  const profile = await User.findById(req.user.id);

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    userName: profile.username,
  });

  //   add comment to post
  res.status(201).json({
    status: SUCCESS,
    message: "Comment created successfully",
    data: comment,
  });
});

/**-----------------------------------------------
 * @desc    Get All Comments
 * @route   /api/comments
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.status(200).json({
    status: SUCCESS,
    message: "Comments fetched successfully",
    data: comments,
  });
});

/**-----------------------------------------------
 * @desc    Delete  Comments
 * @route   /api/comment/:id
 * @method  GET
 * @access  private (only admin or user can access)
 ------------------------------------------------*/

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  //   check if comment exists
  if (!comment) {
    return res.status(404).json({
      status: FAIL,
      message: "Comment not found",
    });
  }
  //   check if user is admin or user himself
  if (comment.user.toString() !== req.user.id || req.user.role !== ADMIN) {
    return res.status(401).json({
      status: FAIL,
      message: "Not authorized",
    });
  }

  await Comment.findByIdAndDelete(id);

  res.status(200).json({
    status: SUCCESS,
    message: "Comment deleted successfully",
  });
});

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
};
