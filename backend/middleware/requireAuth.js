const errorHandler = require("../utils/errorHandler");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return next(errorHandler(401, "Authorization token required"));
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    return next(errorHandler(401, "Request is not authorized"));
  }
};

module.exports = requireAuth;
