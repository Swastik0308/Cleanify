// src/pages/Vendor/VendorLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import "../Home/Home.css"; // reuse global auth styles

const VendorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/vendor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("vendorToken", data.token);
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendor));

        alert("Login successful!");
        navigate("/vendor/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error, please try again later");
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
          <Truck size={40} />
          <h2>Vendor Login</h2>
          <p>Log in to manage your Cleanify jobs and requests.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don’t have a vendor account?{" "}
            <Link to="/register-vendor">Register here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorLogin;
