// src/pages/Services/Services.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Recycle, PartyPopper, Trash2 } from "lucide-react";
import "../Home/Home.css"; // reuse Home styles

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Scrap Collection",
      icon: <Recycle size={40} />,
      badge: "Recycle & Earn",
      description: (
        <>
          Our Scrap Collection service makes recycling convenient and
          hassle-free. Schedule a pickup and let our verified vendors handle the
          collection, sorting, and eco-friendly disposal of metal, plastic,
          paper, or electronic waste. We ensure fair pricing and responsible
          waste management.
        </>
      ),
      image:
        "https://plus.unsplash.com/premium_photo-1671031352715-805ff4f3d20d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2NyYXAlMjBjb2xsZWN0aW9ufGVufDB8fDB8fHww",
    },
    {
      title: "Party Cleaning",
      icon: <PartyPopper size={40} />,
      badge: "After-Party Rescue",
      description: (
        <>
          After the fun ends, leave the mess to us! Our Party Cleaning team
          takes care of everything from trash removal to deep cleaning, ensuring
          your venue is spotless again. Fast, reliable, and affordable — perfect
          for home parties, events, and celebrations.
        </>
      ),
      image:
        "https://media.gettyimages.com/id/678819641/photo/broom-sweeping-heart-shape-confetti-on-floor.jpg?s=612x612&w=0&k=20&c=wpU-_BU56MZ5QTd5PpqgiG-vTKjISOOwj0_5HRVx0fU=",
    },
  ];

  return (
    <div className="home-page" data-testid="services-page">
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
            Our Services
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Cleanify connects you with trusted local vendors for efficient and
            affordable cleaning and waste management services.
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="why-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Offer
          </motion.h2>

          <div className="feature-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Icon + badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="feature-icon">{service.icon}</div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      padding: "0.3rem 0.8rem",
                      borderRadius: "999px",
                      background: "rgba(24,138,66,0.08)",
                      color: "var(--primary)",
                    }}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "1.25rem",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Title & description */}
                <h3>{service.title}</h3>
                <p style={{ marginTop: "0.5rem" }}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container text-center">
          <p className="vendor-preline" style={{ marginBottom: "0.75rem" }}>
            Ready to experience hassle-free cleanliness?
          </p>

          <h2 className="vendor-cta-heading" style={{ marginBottom: "1rem" }}>
            Want to book a service?
          </h2>

          <p
            className="hero-subtitle"
            style={{ color: "white", maxWidth: "600px", margin: "0 auto 2rem" }}
          >
            Schedule your Scrap Collection or Party Cleaning now with just a
            click. Our verified vendors are just one booking away.
          </p>

          <button
            className="cta-button-secondary"
            onClick={() => navigate("/booking")}
          >
            Book Now <Trash2 size={20} />
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
