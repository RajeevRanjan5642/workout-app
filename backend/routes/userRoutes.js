const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();


//login route
router.post("/login", userController.loginUser);

//signup route
router.post("/signup", userController.signupUser);

//email verification route
router.get('/verify-email/:token',userController.verifyEmail);

// forget password route
router.post('/forgot-password', userController.forgotPassword);

// reset password route
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
