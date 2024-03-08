const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const Post = require("../models/post.model");
const {
  validateCreatePost,
  validateUpdatePost,
} = require("../utils/validation/postValidation");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const { ADMIN } = require("../utils/roles");

/**---------------------------------------
 * @desc      Get All Posts
 * @route    /api/v1/post
 * @method   GET
 * @access   public
 ------------------------------------*/

const getAllPosts = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 2;
  const { pageNumber, category } = req.query;
  console.log(pageNumber);
  let posts;

  if (pageNumber) {
    //   pagination
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" });
  } else if (category) {
    posts = await Post.find({ category }).sort({ createdAt: -1 }).populate({
      path: "user",
      select: "-password",
    });
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "Posts fetched successfully",
    data: posts,
  });
});

/**---------------------------------------
 * @desc      Get Single Post
 * @route    /api/v1/post/:id
 * @method   GET
 * @access   public
 ------------------------------------*/

const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({ path: "comments" });

  if (!post) {
    return res.status(400).json({
      status: FAIL,
      message: "Post not found",
      data: null,
    });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "Post fetched successfully",
    data: post,
  });
});

/**---------------------------------------
 * @desc      Create Post
 * @route    /api/v1/post
 * @method   POST
 * @access   private (only logged in can access)
 * ------------------------------------*/

const createPost = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  //  validate for image
  if (!req.file) {
    return res.status(400).json({
      status: FAIL,
      message: "Image is required",
    });
  }

  // validate for data
  const { error } = validateCreatePost({ title, description, category });
  if (error) {
    return res.status(400).json({
      status: FAIL,
      message: error.details[0].message,
    });
  }

  //   upload image
  const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
  const result = await cloudinaryUploadImg(imagePath);

  //  create post and save to database
  const post = await Post.create({
    title,
    description,
    category,
    image: result.url,
    publicId: result.public_id,
    user: req.user.id,
  });

  //   return response
  res.status(200).json({
    status: SUCCESS,
    message: "Post created successfully",
    data: post,
  });

  //   remove image from server
  fs.unlinkSync(imagePath);
});

/**---------------------------------------
 * @desc      get Post Count
 * @route    /api/v1/post/count
 * @method   GET
 * @access   public
 * ------------------------------------*/

const getPostCount = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();

  res.status(200).json({
    status: SUCCESS,
    message: "Post count fetched successfully",
    data: {
      count,
    },
  });
});

/**---------------------------------------
 * @desc      delete Post
 * @route    /api/v1/post/:id
 * @method   DELETE
 * @access   Private (only logged in can access & only admin can access)
 * ------------------------------------*/

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(400).json({
      status: FAIL,
      message: "Post not found",
    });
  }

  if (req.user.role === ADMIN || req.user.id === post.user.toString()) {
    await cloudinaryDeleteImg(post.publicId);
    await Post.findByIdAndDelete(id);

    // delete all comments related to the post

    res.status(200).json({
      status: SUCCESS,
      message: "Post deleted successfully",
      postId: post._id,
    });
  } else {
    return res.status(403).json({
      status: FAIL,
      message: "You are not authorized to delete this post",
    });
  }
});

/**---------------------------------------
 * @desc      update Post
 * @route    /api/v1/post/:id
 * @method   PATCH
 * @access   private (only logged in can access)
 * ------------------------------------*/

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // validate for id
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({
      status: FAIL,
      message: error.details[0].message,
    });
  }

  const post = await Post.findById(id);
  // check if post exists
  if (!post) {
    return res.status(400).json({
      status: FAIL,
      message: "Post not found",
    });
  }

  // check if user is authorized
  if (req.user.id === post.user.toString()) {
    const { title, description, category } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          category,
        },
      },
      { new: true, runValidators: true }
    ).populate({ path: "user", select: "-password" });

    //   return response
    res.status(200).json({
      status: SUCCESS,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } else {
    return res.status(403).json({
      status: FAIL,
      message: "You are not authorized to update this post",
    });
  }
});

/**-----------------------------------------------
 * @desc    Update Post Image
 * @route   /api/posts/image-update/:id
 * @method  PATCH
 * @access  private (only owner of the post)
 ------------------------------------------------*/

const updatePostImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // Validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  // //  Get the post from DB and check if post exist
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // //  Check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }

  // //  Delete the old image
  await cloudinaryDeleteImg(post.publicId);

  // //  Upload new photo
  const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);
  const result = await cloudinaryUploadImg(imagePath);

  // //  Update the image field in the db
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $set: {
        image: result.url,
        publicId: result.public_id,
      },
    },
    { new: true, runValidators: true }
  );

  // //  Send response to client
  res.status(200).json({
    status: SUCCESS,
    message: "image updated successfully",
    data: updatedPost,
  });

  //  Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Toggle Like
 * @route   /api/posts/like/:id
 * @method  PATCH
 * @access  private (only logged in user)
 ------------------------------------------------*/
const toggleLike = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id } = req.params;

  let post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ status: FAIL, message: "post not found" });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true, runValidators: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { likes: loggedInUser },
      },
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    status: SUCCESS,
    message: "post liked",
    data: post,
  });
});

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  getPostCount,
  deletePost,
  updatePost,
  updatePostImage,
  toggleLike,
};
