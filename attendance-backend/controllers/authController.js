const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/otpModel");
const sendEmail = require("../utils/sendEmail");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 1️⃣ SEND OTP (Forgot Password)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // (5 minutes)
    });

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to email" });

  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

// 2️⃣ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP Verified Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

// 3️⃣ RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ email }, { password: hashed });

    res.json({ message: "Password Reset Successful" });

  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};
