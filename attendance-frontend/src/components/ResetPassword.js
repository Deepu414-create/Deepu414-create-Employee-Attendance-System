import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword,
      });

      setMessage("Password Reset Successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage("Failed to reset password!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleReset} style={{ display: "inline-block" }}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Reset Password
        </button>
      </form>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default ResetPassword;
