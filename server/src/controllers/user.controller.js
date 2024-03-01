const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");

/**---------------------------------------
 * @desc      Get User Profile
 * @route    /api/v1/user/profile
 * @method   GET
 * @access   Private (only admin can access)
 ------------------------------------*/

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.find();
  if (!user) {
    res.status(400).json({
      status: FAIL,
      message: "User not found",
      data: null,
    });
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      status: FAIL,
      message: "not allowed to access",
      data: null,
    });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "User profile fetched successfully",
    data: user,
  });
});

module.exports = {
  getUserProfile,
};
