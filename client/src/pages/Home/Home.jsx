import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import { Recycle, Leaf, CheckCircle, ArrowRight } from "lucide-react";
import "./Home.css";

const guiltMessages = [
  "♻️ Every minute you wait, more waste piles up...",
  "🌍 The Earth is watching you, chief.",
  "🚮 That plastic bottle won't recycle itself.",
  "😔 Nature called — she's tired of your excuses.",
  "🔥 Be the reason a landfill doesn't grow today.",
];

const Home = () => {
  const navigate = useNavigate();
  const [showGuiltMessage, setShowGuiltMessage] = useState(false);
  const [currentGuilt, setCurrentGuilt] = useState("");

  const idleTimer = useRef(null);

  const handleCTAClick = () => {
    anime({
      targets: ".cta-button",
      scale: [1, 0.95, 1.05, 1],
      duration: 400,
      easing: "easeInOutQuad",
    });

    setTimeout(() => navigate("/booking"), 200);
  };

  // Idle Tracking
  useEffect(() => {
    const startIdleTimer = () => {
      clearTimeout(idleTimer.current);

      idleTimer.current = setTimeout(() => {
        const randomMessage =
          guiltMessages[Math.floor(Math.random() * guiltMessages.length)];
        setCurrentGuilt(randomMessage);
        setShowGuiltMessage(true);
      }, 15000); // 15 seconds
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, startIdleTimer));

    startIdleTimer();

    return () => {
      clearTimeout(idleTimer.current);
      events.forEach((event) =>
        window.removeEventListener(event, startIdleTimer)
      );
    };
  }, []);

  // Popup animation
  useEffect(() => {
    if (showGuiltMessage) {
      anime({
        targets: ".guilt-message",
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutElastic(1, .7)",
      });

      setTimeout(() => setShowGuiltMessage(false), 3500);
    }
  }, [showGuiltMessage]);

  return (
    <div className="home-page" data-testid="home-page">
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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Turn Your Waste Into Worth
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join the movement. Book scrap pickups or party cleanups in seconds.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              className="cta-button"
              onClick={handleCTAClick}
              data-testid="hero-cta-btn"
            >
              Book Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Guilt message (under CTA, not blocking it) */}
        {showGuiltMessage && (
          <div className="guilt-message">{currentGuilt}</div>
        )}
      </motion.section>

      {/* Why Choose Cleanify */}
      <section className="why-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Cleanify?
          </motion.h2>

          <div className="feature-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Recycle size={40} />
              <h3>Instant Booking</h3>
              <p>Schedule pickups in seconds.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <CheckCircle size={40} />
              <h3>Verified Vendors</h3>
              <p>Trusted professionals for all needs.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Leaf size={40} />
              <h3>Save the Earth</h3>
              <p>Reduce waste & protect nature.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/*} <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2>Join the Movement</h2>
          <p>Every small step matters.</p>
          <button
            className="cta-button-secondary"
            onClick={() => navigate("/book")}
          >
            Start Your Journey <ArrowRight size={20} />
          </button>
        </div>
      </motion.section>
      */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container text-center">
          <p className="vendor-preline">
            Are you a vendor? No problem — we got you. No more roaming around
            aimlessly and burning fuel for nothing.
          </p>

          <h2 className="vendor-cta-heading">Register as Vendor</h2>

          <button
            className="cta-button-secondary"
            onClick={() => navigate("/register-vendor")}
          >
            Become a Vendor <ArrowRight size={20} />
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
