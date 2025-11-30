const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: String,
    checkIn: String,
    checkOut: String,
    totalHours: Number,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
