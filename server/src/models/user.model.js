const { Schema, model } = require("mongoose");
const { ADMIN, USER } = require("../utils/roles.js");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
      default: "assets/images/profile.jpg",
    },
    bio: {
      type: String,
    },

    role: {
      type: String,
      enum: [ADMIN, USER],
      default: USER,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
