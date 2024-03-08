const jwt = require("jsonwebtoken");
const { ADMIN } = require("../utils/roles");
const { FAIL } = require("../utils/httpStatusText");

// Verify Token
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ status: FAIL, message: "invalid token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ status: FAIL, message: "no token provided, access denied" });
  }
}

// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.role === ADMIN) {
      return next();
    } else {
      return res
        .status(403)
        .json({ status: FAIL, message: "not allowed, only admin" });
    }
  });
}

// Verify Token & Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      return next();
    } else {
      return res
        .status(403)
        .json({ status: FAIL, message: "not allowed, only user himself" });
    }
  });
}

// Verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === ADMIN) {
      return next();
    } else {
      return res.status(403).json({
        status: FAIL,
        message: "not allowed, only user himself or admin",
      });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyTokenAndAuthorization,
};
