const Attendance = require("../models/attendanceModel");

// CHECK-IN
exports.checkIn = async (req, res) => {
  const userId = req.user.id;
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toLocaleTimeString().toLowerCase();

  const existing = await Attendance.findOne({ user: userId, date });

  if (existing)
    return res.status(400).json({ message: "Already Checked In Today" });

  const record = await Attendance.create({
    user: userId,
    date,
    checkIn: time,
    checkOut: null,
    totalHours: 0,
    status: "present",
  });

  res.json({ message: "Checked In Successfully", attendance: record });
};

// CHECK-OUT
exports.checkOut = async (req, res) => {
  const userId = req.user.id;
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toLocaleTimeString().toLowerCase();

  const record = await Attendance.findOne({ user: userId, date });

  if (!record)
    return res.status(400).json({ message: "You didn't check in today" });

  if (record.checkOut)
    return res.status(400).json({ message: "Already Checked Out" });

  const hours =
    (new Date(`01/01/2000 ${time}`) -
      new Date(`01/01/2000 ${record.checkIn}`)) /
    36e5;

  record.checkOut = time;
  record.totalHours = hours;
  await record.save();

  res.json({ message: "Checked Out Successfully", record });
};

// FETCH MY ATTENDANCE
exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({ user: req.user.id });
  res.json(records);
};

// ADMIN – GET ALL ATTENDANCE
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("user", "name email role")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
