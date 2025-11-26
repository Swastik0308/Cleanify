import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" data-testid="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>♻️ Cleanify</h3>
            <p>Making waste management simple and sustainable</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/book">Book Now</Link>
            <Link to="/register">Sign Up</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@cleanify.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Cleanify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
