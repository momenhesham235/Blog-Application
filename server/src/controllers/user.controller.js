const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { validateUpdateUser } = require("../utils/validation/userValidation");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

/**---------------------------------------
 * @desc      Get User Profile
 * @route    /api/v1/user/profile
 * @method   GET
 * @access   Private (only admin can access)
 ------------------------------------*/

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.find({}, { password: 0 });
  if (!user) {
    return res.status(400).json({
      status: FAIL,
      message: "User not found",
      data: null,
    });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "User profile fetched successfully",
    data: user,
  });
});

/**---------------------------------------
 * @desc      Get Single User Profile
 * @route    /api/v1/user/profile/:id
 * @method   GET
 * @access   Public 
 ------------------------------------*/

const getSingleUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    return res.status(400).json({
      status: FAIL,
      message: "User not found",
      data: null,
    });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "User profile fetched successfully",
    data: user,
  });
});

/**---------------------------------------
 * @desc      Update User Profile
 * @route    /api/v1/user/profile/:id
 * @method   Patch
 * @access   Private (only user can access) 
 ------------------------------------*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, password, bio } = req.body;

  // validate request body
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({
      status: FAIL,
      message: error.details[0].message,
    });
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        username,
        password,
        bio,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  res.status(200).json({
    status: SUCCESS,
    message: "User profile updated successfully",
    data: user,
  });
});

/**---------------------------------------
 * @desc      Get User count
 * @route    /api/v1/user/count
 * @method   GET
 * @access   Private (only admin can access)
 ------------------------------------*/

const getUserCount = asyncHandler(async (req, res) => {
  const count = await User.count();
  if (!count) {
    return res.status(400).json({
      status: FAIL,
      message: "User not found",
      data: null,
    });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "User profile fetched successfully",
    data: { count },
  });
});

/**---------------------------------------
 * @desc      Profile Photo Upload
 * @route    /api/v1/user/profile-photo
 * @method   POST
 * @access   Private (only logged in user can access)
 ------------------------------------*/

const profilePhotoUpload = asyncHandler(async (req, res) => {
  // validate request body
  if (!req.file) {
    return res.status(400).json({
      status: FAIL,
      message: "Profile photo not uploaded",
    });
  }

  // get the path of the uploaded file
  const pathImage = path.join(__dirname, `../uploads/${req.file.filename}`);
  console.log(pathImage);

  // upload to Cloudinary
  const result = await cloudinaryUploadImg(pathImage);
  // console.log(result);

  // get user database
  const user = await User.findById(req.user.id);

  // delete old profile photo if exists
  if (user.publicId !== null) {
    await cloudinaryDeleteImg(user.publicId);
  }

  // change profile photo field in database
  user.avatar = result.secure_url;
  user.publicId = result.public_id;

  await user.save();

  // return response
  res.status(200).json({
    status: SUCCESS,
    message: "Profile photo uploaded successfully",
    avatar: result.secure_url,
    publicId: result.public_id,
  });

  // delete old profile photo server side
  fs.unlinkSync(pathImage);
});

/**---------------------------------------
 * @desc      Delete User Profile
 * @route    /api/v1/user/:id
 * @method   DELETE
 * @access   Private (only logged in user can access & admin can delete any user)
 ------------------------------------*/
const deleteUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get user database
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      status: FAIL,
      message: "User not found",
    });
  }

  // get all post database
  // get the public ids of the profile photo
  // delete profile photo from cloudinary

  // delete profile photo from cloudinary
  await cloudinaryDeleteImg(user.publicId);
  // delete post & comments from database

  //  delete user from database
  await User.findByIdAndDelete(id);

  // return response
  res.status(200).json({
    status: SUCCESS,
    message: "User deleted successfully",
    data: null,
  });
});

module.exports = {
  getUserProfile,
  getSingleUserProfile,
  updateUserProfile,
  getUserCount,
  profilePhotoUpload,
  deleteUserProfile,
};
