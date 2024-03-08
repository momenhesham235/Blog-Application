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
    publicId: {
      type: String,
      default: null,
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
    toJSON: { virtuals: true }, // include all vituals
    toObject: { virtuals: true }, // include all vituals
  }
);

// populate user with posts and comments when user is fetched
userSchema.virtual("posts", {
  ref: "Post", // the model to use
  foreignField: "user", // which field in the document should be used as the foreign field
  localField: "_id", // which field in the current model should be used as the local field
});

module.exports = model("User", userSchema);
