import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // CHECK-IN
  const handleCheckIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/checkin",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      fetchAttendance();
    } catch {
      setMessage("Check-in failed!");
    }
  };

  // CHECK-OUT
  const handleCheckOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/checkout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      fetchAttendance();
    } catch {
      setMessage("Check-out failed!");
    }
  };

  // FETCH ATTENDANCE
  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance/my-attendance",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttendance(response.data);
    } catch {
      console.log("Attendance fetch error");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Attendance System</h2>
        <div style={styles.navRight}>
          <span style={styles.userName}>Hello, {userName} 👋</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.container}>
        <h1 style={styles.heading}>Dashboard</h1>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button style={styles.checkInBtn} onClick={handleCheckIn}>
            ✔ Check In
          </button>
          <button style={styles.checkOutBtn} onClick={handleCheckOut}>
            ✖ Check Out
          </button>
        </div>

        <p style={styles.message}>{message}</p>

        {/* Attendance */}
        <h2 style={styles.subHeading}>My Attendance</h2>

        {attendance.length === 0 ? (
          <p style={styles.noData}>No records available.</p>
        ) : (
          <div style={styles.list}>
            {attendance.map((item) => (
              <div key={item._id} style={styles.card}>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Check In:</strong> {item.checkIn || "—"}</p>
                <p><strong>Check Out:</strong> {item.checkOut || "—"}</p>
                <p><strong>Total Hours:</strong> {item.totalHours}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

/* =======================
   STYLING
========================= */

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },

  navbar: {
    width: "100%",
    padding: "15px 30px",
    backgroundColor: "#1e3a8a",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  userName: {
    fontSize: "16px",
    fontWeight: "500",
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: "8px 15px",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  container: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    marginTop: "40px",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },

  buttonRow: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },

  checkInBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  checkOutBtn: {
    backgroundColor: "red",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  message: {
    marginTop: "20px",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#333",
  },

  subHeading: {
    marginTop: "40px",
    fontSize: "26px",
  },

  noData: {
    color: "#888",
    marginTop: "20px",
  },

  list: {
    marginTop: "20px",
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    margin: "10px auto",
    width: "350px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
    lineHeight: "1.7",
  },
};
