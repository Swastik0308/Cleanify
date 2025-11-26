// src/pages/Auth/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import { Leaf, Sparkles, CheckCircle } from "lucide-react";
import api from "../../services/api.js";
import "../Home/Home.css"; // reuse global styles

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Floating emojis / icons vibe
    anime({
      targets: ".signup-emoji",
      translateY: [0, -12],
      direction: "alternate",
      loop: true,
      delay: anime.stagger(150),
      easing: "easeInOutSine",
      duration: 1800,
    });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      console.log(res.data);
      alert("Welcome to Cleanify! 🌱");
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error(err);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="container signup-layout">
        {/* Left side – Gen Z / eco messaging */}
        <motion.div
          className="signup-left mt-5"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="signup-pill">
            <Sparkles size={16} />
            <span>No subscriptions. No ads. Just clean vibes.</span>
          </div>

          <h1 className="signup-title">
            Sign up. <span className="signup-highlight">Clean up.</span>
          </h1>

          <p className="signup-subtitle">
            Join Cleanify and turn your <strong>scrap & party mess</strong> into{" "}
            <strong>clean streets and happier cities</strong>. Free to use,
            forever. Because cleanliness shouldn’t be behind a paywall.
          </p>

          <ul className="signup-perks">
            <li>
              <CheckCircle size={18} />
              <span>₹0 subscription. Always free for customers.</span>
            </li>
            <li>
              <CheckCircle size={18} />
              <span>Book scrap pickups in under 30 seconds.</span>
            </li>
            <li>
              <CheckCircle size={18} />
              <span>Help your city breathe a little easier. 🌿</span>
            </li>
          </ul>

          <div className="signup-emojis">
            <span className="signup-emoji">🌱</span>
            <span className="signup-emoji">🧹</span>
            <span className="signup-emoji">♻️</span>
            <span className="signup-emoji">🌍</span>
          </div>
        </motion.div>

        {/* Right side – Form card */}
        <motion.div
          className="signup-right mt-5"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="auth-container signup-card">
            <div className="auth-header" style={{ marginBottom: "1.5rem" }}>
              <Leaf size={40} />
              <h2>Create your Cleanify account</h2>
              <p>2 minutes now = years of guilt-free cleanliness later.</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Make it strong. No ‘1234’, please 😅"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Create account
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already cleaning with us?{" "}
                <Link to="/login">Log in instead</Link>
              </p>
              <p className="signup-smallprint">
                By signing up, you agree to receive{" "}
                <span>zero spam and maximum cleanliness</span>. We only ping you
                for things that matter.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
