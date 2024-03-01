const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  console.log(payload);
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });

  return token;
};
