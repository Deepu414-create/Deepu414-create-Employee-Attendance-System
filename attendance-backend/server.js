const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Attendance Backend Server Running 🚀");
});

// Route Middlewares
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
