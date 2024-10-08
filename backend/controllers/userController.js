const User = require("./../models/userModel");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};
// login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const isVerified = user.isVerified;
    res.status(200).json({ email, token, isVerified });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//signup user
exports.signupUser = async (req, res, next) => {
  const { email, password, isVerified } = req.body;
  try {
    const user = await User.signup(email, password, isVerified);
    const token = createToken(user._id);

    // Send email for verification
    await sendEmail(email, token);
    res
      .status(200)
      .json({
        email,
        token,
        message: "A verification link has been sent to your email.",
      });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//verify email
exports.verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return next(errorHandler(400, "verification token is missing"));
  }
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById({ _id });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    user.isVerified = true;
    await user.save();

    //redirect to login page
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    next(errorHandler(400, "Invalid or expired verification token"));
  }
};
