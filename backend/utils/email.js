
const nodemailer = require("nodemailer");
const errorHandler = require("./errorHandler");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async (email, token) => {
  const verificationURL =
    process.env.REACT_PATH + `/verify-email/${token}`;
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
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Email Verification",
      html: `<p>Please verify your email by clicking on the following link: <a href="${verificationURL}">${verificationURL}</a></p>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error(error.message);
  }
};
module.exports = sendEmail;
