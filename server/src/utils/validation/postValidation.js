const joi = require("joi");

// create post
const validateCreatePost = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200).required(),
    description: joi.string().trim().min(10).max(300).required(),
    category: joi.string().trim().required(),
  });

  return schema.validate(obj);
};

// update post
const validateUpdatePost = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200),
    description: joi.string().trim().min(10).max(300),
    category: joi.string().trim(),
  });

  return schema.validate(obj);
};

module.exports = {
  validateCreatePost,
  validateUpdatePost,
};
