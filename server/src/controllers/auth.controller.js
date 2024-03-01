const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../utils/validation/userValidation");
const { FAIL, SUCCESS } = require("../utils/httpStatusText");
const generateJWT = require("../utils/generateJWT");

/**---------------------------------------
 * @desc    Register User - Sign Up
 * @route    /api/v1/auth/register
 * @method   POST
 * @access   Public
 ------------------------------------*/

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  // validate
  const { error } = validateRegisterUser(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      status: FAIL,
      message: error.details[0].message,
    });
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log(userExists);
    res.status(400).json({
      status: FAIL,
      message: "User already exists",
    });
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const generateToken = await generateJWT({
    id: user._id,
    role: user.role,
  });

  user.token = generateToken;

  await user.save();

  // TODO: check if user is verified

  // send response
  res.status(201).json({
    status: SUCCESS,
    message: "User created successfully",
    data: {
      user,
    },
  });
});

/**---------------------------------------
 * @desc     Login User - Sign In
 * @route    /api/v1/auth/login
 * @method   POST
 * @access   Public
 * ------------------------------------*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validate
  const { error } = validateLoginUser(req.body);
  if (error) {
    res.status(400).json({
      status: FAIL,
      message: error.details[0].message,
    });
  }
  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      status: FAIL,
      message: "User not found",
    });
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400).json({
      status: FAIL,
      message: "Invalid password",
    });
  }

  // TODO: check if user is verified

  // generate JWT
  const token = await generateJWT({
    id: user._id,
    role: user.role,
  });

  // send response
  res.status(200).json({
    status: SUCCESS,
    message: "User logged in successfully",
    data: {
      token,
      user,
    },
  });
});

module.exports = { registerUser, loginUser };
