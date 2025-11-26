// src/pages/Vendor/RegisterVendor.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Recycle, IndianRupee, ShieldCheck } from "lucide-react";
import "../Home/Home.css"; // reuse global styles

const RegisterVendor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const vendorData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      address: formData.location,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/vendor/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vendorData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("vendorToken", data.token);
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendor));
        alert("Vendor registered successfully!");
        navigate("/vendor/dashboard");
      } else {
        alert(data.message || "Error registering vendor");
      }
    } catch (error) {
      console.error(error);
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="auth-page vendor-page">
      <div className="container vendor-layout">
        {/* Left: vendor pitch */}
        <motion.div
          className="vendor-left mt-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="vendor-pill">
            <Recycle size={18} />
            <span>No subscriptions. No listing fees. Just more pickups.</span>
          </div>

          <h1 className="vendor-title">
            Grow your business with{" "}
            <span className="vendor-highlight">Cleanify Vendors</span>
          </h1>

          <p className="vendor-subtitle">
            Get scrap pickups and party cleaning leads from nearby customers.
            You focus on the work, we handle the discovery.
          </p>

          <ul className="vendor-perks">
            <li>
              <IndianRupee size={18} />
              <span>Pay ₹0 to join — keep what you earn.</span>
            </li>
            <li>
              <Truck size={18} />
              <span>Get location-based leads instead of roaming blindly.</span>
            </li>
            <li>
              <ShieldCheck size={18} />
              <span>
                Work with verified customers through a trusted platform.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Right: form */}
        <motion.div
          className="vendor-right mt-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          <div className="auth-container vendor-card">
            <div className="auth-header" style={{ marginBottom: "1.5rem" }}>
              <Truck size={40} />
              <h2>Register as a Vendor</h2>
              <p>Get matched with customers who actually need your service.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your service</option>
                  <option value="Scrap Collection">Scrap Collection</option>
                  <option value="Party Cleaning">Party Cleaning</option>
                </select>
              </div>

              <div className="form-group">
                <label>Service Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your area or city"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Register as Vendor
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already a vendor? <Link to="/vendor/login">Log in here</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterVendor;
