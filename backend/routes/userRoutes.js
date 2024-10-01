const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();


//login route
router.post("/login", userController.loginUser);

//signup route
router.post("/signup", userController.signupUser);

//email verification route
router.get('/verify-email/:token',userController.verifyEmail);

module.exports = router;
