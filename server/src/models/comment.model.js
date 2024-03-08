const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Comment", commentSchema);
