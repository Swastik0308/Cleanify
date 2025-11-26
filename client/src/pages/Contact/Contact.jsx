// src/pages/Contact/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import "../Home/Home.css"; // reuse Home styles

const Contact = () => {
  return (
    <div className="home-page" data-testid="contact-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Have a question, suggestion, or feedback? We’d love to hear from
            you! Reach out to us using the form below or through our contact
            details.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form + Info */}
      <section className="why-section">
        <div className="container">
          <div className="feature-grid">
            {/* Contact Form Card */}
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="feature-icon">
                  <Mail />
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>Send us a message</h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "var(--text-gray)",
                    }}
                  >
                    Fill out the form and we’ll get back to you as soon as we
                    can.
                  </p>
                </div>
              </div>

              <form className="auth-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" required />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows="4"
                    placeholder="Write your message here..."
                    style={{ resize: "vertical" }}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info + Socials Card */}
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <h3>Our Contact Details</h3>

              <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <Mail size={20} color="#188a42" />
                  <p style={{ margin: 0 }}>cleanifyteam@gmail.com</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <MapPin size={20} color="#ef4444" />
                  <p style={{ margin: 0 }}>
                    Dr. Ambedkar Institute of Technology, Bengaluru
                  </p>
                </div>
              </div>

              <h4 style={{ marginBottom: "0.75rem" }}>Find us online</h4>
              <p
                style={{
                  marginTop: 0,
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  color: "var(--text-gray)",
                }}
              >
                Stay connected with the Cleanify developers and follow our work.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                {/* Hrishvith GitHub */}
                <a
                  href="https://github.com/hrishgithub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                  }}
                >
                  <Github size={18} />
                  <span>Hrishvith</span>
                </a>

                {/* Swastik GitHub */}
                <a
                  href="https://github.com/Swastik0308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                  }}
                >
                  <Github size={18} />
                  <span>Swastik</span>
                </a>

                {/* Hrishvith LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/hrishvith-cns-065091320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                  }}
                >
                  <Linkedin size={18} />
                  <span>Hrishvith</span>
                </a>

                {/* Swastik LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/shettyswastik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                  }}
                >
                  <Linkedin size={18} />
                  <span>Swastik</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Optional small closing strip */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container text-center">
          <h2>We’re listening.</h2>
          <p className="hero-subtitle" style={{ color: "white" }}>
            Your feedback helps us make cleanliness more convenient and
            sustainable — one home, one neighborhood, one city at a time.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
