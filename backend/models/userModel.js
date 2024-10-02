const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/errorHandler");
const validator = require("validator");
const sendEmail = require("../utils/email");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password, isVerified) {
  // validation
  if (!email || !password) {
    throw Error("Email and password is required !!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Please use a strong password!");
  }

  const existingUser = await this.findOne({ email });

  if (existingUser && !existingUser.isVerified) {
    const token = createToken(existingUser._id);
    try {
      await sendEmail(email, token);
      res
        .status(200)
        .json({
          email,
          token,
          message: "A verification link has been sent to your email.",
        });
    } catch (error) {
      // If email sending fails, delete the created user
      await existingUser.findByIdAndDelete(existingUser._id);
      return next(
        errorHandler(
          500,
          "Failed to send verification email. Please try again later."
        )
      );
    }
  } else if (existingUser && existingUser.isVerified) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, isVerified });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password required !!");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid login credentials");
  }

  if (!user.isVerified) throw Error("Email is not verified");

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid login credentials");
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
