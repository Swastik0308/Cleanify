// src/pages/About/About.jsx
import React from "react";
import { motion } from "framer-motion";
import "../Home/Home.css"; // reuse Home styles

const About = () => {
  return (
    <div className="home-page" data-testid="about-page">
      {/* Hero Section - About Cleanify */}
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
            About Cleanify
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Cleanify is a community-driven platform that bridges the gap between
            customers and local cleaning service providers. Our mission is to
            simplify waste management and cleaning services — making it easy,
            affordable, and sustainable for everyone. From scrap collection to
            post-party cleanup, Cleanify ensures efficiency, transparency, and
            environmental responsibility.
          </motion.p>
        </div>
      </motion.section>

      {/* Meet the Developers Section */}
      <section className="why-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet the Developers
          </motion.h2>

          <div className="feature-grid">
            {/* Hrishvith */}
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h3>Hrishvith C</h3>
              <p className="text-muted">
                Information Science Engineering student at Dr. Ambedkar
                Institute of Technology (DR AIT), Bengaluru.
              </p>
              <p>
                I have a strong interest in full-stack development and enjoy
                building applications that solve real-world problems with clean
                and efficient designs. I’m constantly learning new technologies
                and improving my skills through projects like Cleanify.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="https://github.com/hrishgithub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2"
                  style={{ fontSize: "1.5rem", color: "#111827" }}
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hrishvith-cns-065091320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2"
                  style={{ fontSize: "1.5rem", color: "#0a66c2" }}
                >
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </motion.div>

            {/* Swastik */}
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3>Swastik Shetty</h3>
              <p className="text-muted">
                Information Science and Engineering student at Dr. Ambedkar
                Institute of Technology, Bengaluru.
              </p>
              <p>
                I’m passionate about creating impactful and efficient solutions
                through technology. I enjoy working on projects that simplify
                daily life and showcase the power of clean, well-structured code
                — like Cleanify.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="https://github.com/Swastik0308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2"
                  style={{ fontSize: "1.5rem", color: "#111827" }}
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shettyswastik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2"
                  style={{ fontSize: "1.5rem", color: "#0a66c2" }}
                >
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision / Closing Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container text-center">
          <h2>Our Vision</h2>
          <p className="hero-subtitle" style={{ color: "white" }}>
            We aim to make cleanliness convenient and sustainable for everyone —
            one home, one neighborhood, one city at a time.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
