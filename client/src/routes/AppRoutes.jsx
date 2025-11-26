// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Page Imports
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Services from "../pages/Services/Services.jsx";
import About from "../pages/About/About.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import RegisterVendor from "../pages/Vendor/RegisterVendor.jsx";
import Booking from "../pages/Booking/Booking.jsx";
import VendorLogin from "../pages/Vendor/VendorLogin.jsx";

// Protected Routes
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PrivateVendorRoute from "../utils/PrivateVendorRoute.jsx";

// Vendor Dashboard (create this page if not created)
import VendorDashboard from "../pages/Vendor/VendorDashboard.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-vendor" element={<RegisterVendor />} />
      <Route path="/vendor/login" element={<VendorLogin />} />

      {/* Core */}
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Booking */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      {/* Vendor Dashboard */}
      <Route
        path="/vendor/dashboard"
        element={
          <PrivateVendorRoute>
            <VendorDashboard />
          </PrivateVendorRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="text-center mt-5">
            <h2>404 - Page Not Found</h2>
            <p>This page doesn’t exist.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
