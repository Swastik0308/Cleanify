// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Global Navbar */}
        <Navbar />

        {/* Main Routes */}
        <div className="content-wrapper" style={{ minHeight: "80vh" }}>
          <AppRoutes />
        </div>

        {/* Global Footer */}
        <Footer />

        {/* ✅ Toast Container must be rendered once (outside all routes) */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
