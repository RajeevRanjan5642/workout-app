const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/errorHandler");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User already exists");
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

  if(!user.isVerified) throw Error("Email is not verified");

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid login credentials");
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
