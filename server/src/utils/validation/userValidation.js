const joi = require("joi");

const validateRegisterUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(3).max(30).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
    role: joi.string().trim().required().valid("user", "admin"),
  });

  return schema.validate(obj);
};

const validateLoginUser = (obj) => {
  const schema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
  });

  return schema.validate(obj);
};

// validate Update User
const validateUpdateUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(3).max(30),
    password: joi.string().trim().min(8),
    bio: joi.string().trim().max(200),
  });

  return schema.validate(obj);
};
module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
