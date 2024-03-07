const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { validateUpdateUser } = require("../utils/validation/userValidation");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");

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

module.exports = {
  getUserProfile,
  getSingleUserProfile,
  updateUserProfile,
  getUserCount,
};
