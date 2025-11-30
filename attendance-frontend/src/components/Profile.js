import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (error) {
        console.log("Profile error", error);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

        {!profile ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Role:</strong> {profile.role}
            </p>
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleBack} style={styles.backBtn}>
            ← Back to Dashboard
          </button>
          <Link to="/admin" style={{ marginLeft: "15px", fontSize: "14px" }}>
            Go to Admin Panel (if admin)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "25px 35px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    minWidth: "320px",
    textAlign: "left",
  },
  backBtn: {
    padding: "8px 15px",
    border: "none",
    backgroundColor: "#1e3a8a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
