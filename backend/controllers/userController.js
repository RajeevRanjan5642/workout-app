const User = require("./../models/userModel");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// login user
exports.loginUser = async (req, res) => {
  res.json({ msg: "user logged in" });
};

//signup user
exports.signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
