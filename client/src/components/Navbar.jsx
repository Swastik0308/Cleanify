// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User as UserIcon } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setUserMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => path === location.pathname;

  return (
    <nav className="navbar fixed-nav">
      <div className="nav-center">
        {/* BRAND */}
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon">♻️</span>
          <span className="brand-text">Cleanify</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`nav-link ${isActive("/services") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {isAuthenticated && user?.role === "user" && (
            <Link
              to="/booking"
              className={`nav-link ${isActive("/booking") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Book
            </Link>
          )}

          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <UserIcon size={18} />
                <span>{user?.name}</span>
              </button>
              <div className={`dropdown-menu ${userMenuOpen ? "open" : ""}`}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-link signup"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
