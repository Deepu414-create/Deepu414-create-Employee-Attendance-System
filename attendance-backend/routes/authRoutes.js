const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword
} = require("../controllers/authController");

// ROUTES

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password → Send OTP
router.post("/forgot-password", forgotPassword);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;
