import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setMessage("OTP sent to your email!");

      // Save email for later steps
      localStorage.setItem("resetEmail", email);

      setTimeout(() => navigate("/verify-otp"), 1000);

    } catch (error) {
      setMessage("Failed to send OTP!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={sendOTP} style={{ display: "inline-block" }}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            backgroundColor: "purple",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send OTP
        </button>
      </form>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default ForgotPassword;
