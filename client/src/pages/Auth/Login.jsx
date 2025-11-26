// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";
import api from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "../Home/Home.css"; // reuse global styles (auth-page, auth-container, etc.)

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data;

      login(user, token);
      alert("Login successful!");

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Invalid credentials! Please try again."
      );
    }
  };

  return (
    <div className="auth-page mt-5">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="auth-header">
          <LogIn size={40} />
          <h2>Welcome Back 👋</h2>
          <p>Log in to manage your bookings and keep Cleanify rolling.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f9fafb",
                borderRadius: "12px",
                paddingRight: "0.75rem",
                border: "2px solid #e5e7eb",
              }}
            >
              <Mail
                size={18}
                style={{ marginLeft: "0.6rem", color: "#6b7280" }}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  border: "none",
                  background: "transparent",
                  paddingLeft: 0,
                  boxShadow: "none",
                  flex: 1,
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f9fafb",
                borderRadius: "12px",
                paddingRight: "0.75rem",
                border: "2px solid #e5e7eb",
              }}
            >
              <Lock
                size={18}
                style={{ marginLeft: "0.6rem", color: "#6b7280" }}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  border: "none",
                  background: "transparent",
                  paddingLeft: 0,
                  boxShadow: "none",
                  flex: 1,
                }}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
