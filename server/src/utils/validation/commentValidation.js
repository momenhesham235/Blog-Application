const joi = require("joi");

// Validate Create Comment
function validateCreateComment(obj) {
  const schema = joi.object({
    postId: joi.string().required().label("Post ID"),
    text: joi.string().trim().required().label("Text"),
  });
  return schema.validate(obj);
}

// Validate Update Comment
function validateUpdateComment(obj) {
  const schema = joi.object({
    text: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  validateCreateComment,
  validateUpdateComment,
};
