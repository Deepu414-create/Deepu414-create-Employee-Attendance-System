import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      setMessage("OTP Verified Successfully!");

      // move to reset password page
      setTimeout(() => navigate("/reset-password"), 1000);

    } catch (error) {
      setMessage("Invalid OTP!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Enter OTP</h2>

      <form onSubmit={handleVerify} style={{ display: "inline-block" }}>
        <input
          type="text"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Verify OTP
        </button>
      </form>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default VerifyOTP;
