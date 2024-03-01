const joi = require("joi");

const validateRegisterUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(3).max(30).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
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

module.exports = {
  validateRegisterUser,
  validateLoginUser,
};
