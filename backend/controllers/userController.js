const User = require("./../models/userModel");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};
// login user

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(400, "Email and password required !!"));
    }
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "Invalid login credentials"));
    }

    if (!user.isVerified)
      return next(
        errorHandler(
          400,
          "Email is not verified. Please Sign up to verify your Email."
        )
      );

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return next(errorHandler(404, "Invalid login credentials"));
    }
    const token = createToken(user._id);
    const isVerified = user.isVerified;
    res.status(200).json({ email, token, isVerified });
  } catch (err) {
    next(err);
  }
};

//signup user
exports.signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // validation
    if (!email || !password) {
      return next(errorHandler(400, "Email and password is required !!"));
    }
    if (!validator.isEmail(email)) {
      return next(errorHandler(400, "Email is not valid!"));
    }
    if (!validator.isStrongPassword(password)) {
      return next(errorHandler(400, "Please use a strong password!"));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && !existingUser.isVerified) {
      const token = createToken(existingUser._id);
      await sendEmail(email, token);
      res.status(200).json({
        message: "A verification link has been sent to your email.",
      });
    } else if (existingUser && existingUser.isVerified) {
      return next(errorHandler(400, "Email already in use."));
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({ email, password: hash });
      const token = createToken(user._id);

      // Send email for verification
      await sendEmail(email, token);
      res.status(200).json({
        email,
        token,
        message: "A verification link has been sent to your email.",
      });
    }
  } catch (err) {
    next(err);
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
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    next(err);
  }
};

// forget password
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(errorHandler(404, "User not found"));
  }
  const token = createToken(user._id);

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USERNAME,
      subject: "Password Reset",
      html: `<p>Please reset your password by clicking on the following link: <a href="${resetURL}">${resetURL}</a></p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      email,
      token,
      message: "A reset password link has been sent to your email.",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById({ _id });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    // hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    res.status(200).json({
      message: "Password has been reset successfully",
    });
  } catch (err) {
    next(err);
  }
};
