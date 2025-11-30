const express = require("express");
const router = express.Router();

const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/checkin", authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/my-attendance", authMiddleware, getMyAttendance);

router.get("/all", authMiddleware, adminMiddleware, getAllAttendance);

module.exports = router;
