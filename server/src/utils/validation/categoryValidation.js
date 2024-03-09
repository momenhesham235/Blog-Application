const joi = require("joi");

// Validate Create Category
function validateCreateCategory(obj) {
  const schema = joi.object({
    title: joi.string().trim().required().label("Title"),
  });
  return schema.validate(obj);
}

module.exports = {
  validateCreateCategory,
};
