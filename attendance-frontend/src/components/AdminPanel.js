import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    if (role !== "admin") {
      setMessage("You are not an admin. Access denied.");
      return;
    }

    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/attendance/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecords(res.data);
      } catch (error) {
        setMessage("Failed to load attendance data");
      }
    };

    fetchAll();
  }, [token, role, navigate]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const downloadCSV = () => {
    if (!records.length) return;

    const header = "Name,Email,Role,Date,CheckIn,CheckOut,TotalHours,Status\n";

    const rows = records
      .map((r) => {
        const u = r.user || {};
        return [
          u.name || "",
          u.email || "",
          u.role || "",
          r.date || "",
          r.checkIn || "",
          r.checkOut || "",
          r.totalHours || "",
          r.status || "",
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",");
      })
      .join("\n");

    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Admin Panel – All Attendance</h2>

        <button onClick={handleBack} style={styles.backBtn}>
          ← Back to Dashboard
        </button>

        {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}

        {records.length > 0 && role === "admin" && (
          <>
            <button onClick={downloadCSV} style={styles.csvBtn}>
              Download CSV
            </button>

            <div style={{ overflowX: "auto", marginTop: "15px" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r._id}>
                      <td>{r.user?.name}</td>
                      <td>{r.user?.email}</td>
                      <td>{r.user?.role}</td>
                      <td>{r.date}</td>
                      <td>{r.checkIn}</td>
                      <td>{r.checkOut}</td>
                      <td>{r.totalHours}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px 25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "1000px",
  },
  backBtn: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#1e3a8a",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "10px",
  },
  csvBtn: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
};
