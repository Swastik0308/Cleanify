// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import anime from "animejs/lib/anime.es.js";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { Player } from "@lottiefiles/react-lottie-player";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../../api/api";
// import "./Booking.css";

// /* --- constants --- */
// const CATEGORIES = [
//   { key: "paper", label: "Paper", rate: 12 },
//   { key: "plastic", label: "Plastic", rate: 8 },
//   { key: "steel", label: "Steel", rate: 26 },
//   { key: "electronics", label: "Electronics", rate: 35 },
//   { key: "aluminium", label: "Aluminium", rate: 120 },
//   { key: "copper", label: "Copper", rate: 600 },
//   { key: "glass", label: "Glass", rate: 6 },
//   { key: "organic", label: "Organic", rate: 2 },
// ];

// const containerVariants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 18, scale: 0.98 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
//   hover: { y: -8, boxShadow: "0 18px 40px rgba(2,6,23,0.2)" },
// };

// /* --------------------------------------------------------------
//    Category Card Component
// -------------------------------------------------------------- */
// const CategoryCard = ({ cat, sel, toggle, setKg, cardRefs }) => {
//   return (
//     <motion.article
//       className={`scrap-card ${sel.checked ? "selected" : ""}`}
//       variants={cardVariants}
//       whileHover="hover"
//       ref={(el) => (cardRefs.current[cat.key] = el)}
//       onClick={() => toggle(cat.key)}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => e.key === "Enter" && toggle(cat.key)}
//     >
//       <div className="card-top">
//         <div className="icon-blob">{cat.label[0]}</div>

//         <div className="card-title">
//           <div className="label">{cat.label}</div>
//           <div className="rate">
//             ₹{cat.rate} <span className="per-kg">/kg</span>
//           </div>
//         </div>

//         <input
//           type="checkbox"
//           checked={sel.checked}
//           onChange={(e) => {
//             e.stopPropagation();
//             toggle(cat.key);
//           }}
//           onClick={(e) => e.stopPropagation()}
//         />
//       </div>

//       <div
//         className="card-body"
//         onClick={(e) => e.stopPropagation()} // IMPORTANT FIX
//       >
//         <div className="weight-input">
//           <label>Approx weight (kg)</label>
//           <input
//             type="text"
//             placeholder="e.g., 2.5"
//             inputMode="decimal"
//             value={sel.approxKg}
//             onChange={(e) => setKg(cat.key, e.target.value)}
//             disabled={!sel.checked}
//             onClick={(e) => e.stopPropagation()}
//             onFocus={(e) => e.stopPropagation()}
//           />
//         </div>
//         <div className="card-note">
//           Vendors verify on-site — price may change.
//         </div>
//       </div>
//     </motion.article>
//   );
// };

// /* --------------------------------------------------------------
//    Main Booking Component
// -------------------------------------------------------------- */
// const Booking = () => {
//   const navigate = useNavigate();
//   const [isParty, setIsParty] = useState(false);
//   const [address, setAddress] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [animationJson, setAnimationJson] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [playingAnimation, setPlayingAnimation] = useState(false);

//   const cardRefs = useRef({});

//   const [selected, setSelected] = useState(() =>
//     Object.fromEntries(
//       CATEGORIES.map((c) => [c.key, { checked: false, approxKg: "" }])
//     )
//   );

//   // -------------------------------------------- auth check
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       toast.info("Please log in to book a service.");
//       navigate("/login");
//     }
//   }, [navigate]);

//   // -------------------------------------------- load lottie once
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(
//           "https://assets10.lottiefiles.com/packages/lf20_bz0jdah9.json"
//         );
//         setAnimationJson(res.data);
//       } catch {}
//     })();
//   }, []);

//   // -------------------------------------------- animation on card
//   const pulseCard = (key) => {
//     const el = cardRefs.current[key];
//     if (!el) return;
//     anime({
//       targets: el,
//       scale: [1, 1.04, 1],
//       duration: 320,
//       easing: "easeOutQuad",
//     });
//   };

//   // -------------------------------------------- toggle category
//   const toggleCategory = (key) => {
//     setSelected((prev) => ({
//       ...prev,
//       [key]: { ...prev[key], checked: !prev[key].checked },
//     }));
//     pulseCard(key);
//   };

//   // -------------------------------------------- set weight
//   const setKg = (key, val) => {
//     if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
//       setSelected((prev) => ({
//         ...prev,
//         [key]: { ...prev[key], approxKg: val },
//       }));
//     }
//   };

//   // -------------------------------------------- estimated price
//   const estimated = useMemo(() => {
//     return CATEGORIES.reduce((sum, c) => {
//       const s = selected[c.key];
//       return s.checked ? sum + (Number(s.approxKg) || 0) * c.rate : sum;
//     }, 0);
//   }, [selected]);

//   // -------------------------------------------- submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) return navigate("/login");

//     if (!address.trim()) return toast.error("Enter an address.");
//     if (!timeSlot) return toast.error("Pick a time slot.");

//     // Scrap validation
//     if (!isParty) {
//       const any = Object.values(selected).some(
//         (s) => s.checked && Number(s.approxKg) > 0
//       );
//       if (!any) return toast.error("Select a scrap type with weight.");
//     }

//     const scrapDetails = !isParty
//       ? CATEGORIES.filter((c) => selected[c.key].checked)
//           .filter((c) => Number(selected[c.key].approxKg) > 0)
//           .map((c) => ({
//             material: c.key,
//             approxKg: Number(selected[c.key].approxKg),
//             ratePerKg: c.rate,
//           }))
//       : [];

//     const totalKg = scrapDetails.reduce((sum, s) => sum + s.approxKg, 0);

//     if (!isParty && totalKg <= 0) {
//       return toast.error("Please enter valid weights.");
//     }

//     const payload = {
//       wasteType: isParty ? "partyCleaning" : "scrap",
//       quantity: totalKg || 1,
//       address: address.trim(),
//       pickupDate: timeSlot,
//     };

//     try {
//       setLoading(true);
//       await api.post("/waste/requests/create", payload);

//       toast.success("Booking created — making Earth greener 🌱");
//       setPlayingAnimation(true);

//       setTimeout(() => {
//         setPlayingAnimation(false);
//         setLoading(false);
//         resetForm();
//         navigate("/");
//       }, 3800);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Booking failed");
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setAddress("");
//     setTimeSlot("");
//     setIsParty(false);
//     setSelected(
//       Object.fromEntries(
//         CATEGORIES.map((c) => [c.key, { checked: false, approxKg: "" }])
//       )
//     );
//   };

//   /* -------------------------------------------------------------- */
//   return (
//     <div className="booking-page">
//       <div className="container">
//         <motion.header
//           initial={{ opacity: 0, y: -8 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="booking-header"
//         >
//           <h1>Book a Pickup</h1>
//           <p className="subtitle">Turn waste into value — book in seconds.</p>
//         </motion.header>

//         <motion.section
//           className="booking-card-grid-wrap"
//           initial="hidden"
//           animate="show"
//           variants={containerVariants}
//         >
//           {/* LEFT SIDE */}
//           <div className="cards-column">
//             {CATEGORIES.map((cat) => (
//               <CategoryCard
//                 key={cat.key}
//                 cat={cat}
//                 sel={selected[cat.key]}
//                 toggle={toggleCategory}
//                 setKg={setKg}
//                 cardRefs={cardRefs}
//               />
//             ))}
//           </div>

//           {/* RIGHT SIDE */}
//           <aside className="booking-side">
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="glass-panel"
//             >
//               <div className="toggle-row">
//                 <button
//                   className={`pill ${!isParty ? "active" : ""}`}
//                   onClick={() => setIsParty(false)}
//                 >
//                   Scrap Pickup
//                 </button>
//                 <button
//                   className={`pill ${isParty ? "active" : ""}`}
//                   onClick={() => setIsParty(true)}
//                 >
//                   Party Cleaning
//                 </button>
//               </div>

//               {isParty && (
//                 <div className="party-note">
//                   Our team will send a quick quote.
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="booking-form">
//                 <label>Address</label>
//                 <textarea
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   rows={3}
//                   required
//                 />

//                 <label>Preferred date & time</label>
//                 <input
//                   type="datetime-local"
//                   value={timeSlot}
//                   onChange={(e) => setTimeSlot(e.target.value)}
//                   required
//                 />

//                 <div className="summary-row">
//                   <div>
//                     <div className="summary-label">Estimated</div>
//                     <div className="summary-value">₹{estimated.toFixed(0)}</div>
//                   </div>
//                   <div className="summary-note">
//                     Final amount verified on pickup
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <motion.button
//                     whileTap={{ scale: 0.97 }}
//                     type="submit"
//                     className="btn-primary"
//                     disabled={loading}
//                   >
//                     {loading ? "Booking..." : "Book Now"}
//                   </motion.button>
//                   <button
//                     type="button"
//                     className="btn-ghost"
//                     onClick={resetForm}
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </aside>
//         </motion.section>

//         {/* Lottie overlay */}
//         <AnimatePresence>
//           {playingAnimation && animationJson && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="overlay-lottie"
//             >
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.8 }}
//                 className="lottie-card"
//               >
//                 <Player
//                   autoplay
//                   keepLastFrame
//                   src={animationJson}
//                   style={{ height: 260, width: 260 }}
//                 />
//                 <div className="lottie-text">
//                   Thanks — making Earth greener 🌱
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Booking;

// src/pages/Booking/Booking.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api";
import "./Booking.css";

/* --- constants --- */
const CATEGORIES = [
  { key: "paper", label: "Paper", rate: 12 },
  { key: "plastic", label: "Plastic", rate: 8 },
  { key: "steel", label: "Steel", rate: 26 },
  { key: "electronics", label: "Electronics", rate: 35 },
  { key: "aluminium", label: "Aluminium", rate: 120 },
  { key: "copper", label: "Copper", rate: 600 },
  { key: "glass", label: "Glass", rate: 6 },
  { key: "organic", label: "Organic", rate: 2 },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: { y: -8, boxShadow: "0 18px 40px rgba(2,6,23,0.2)" },
};

/* --------------------------------------------------------------
   Category Card Component
-------------------------------------------------------------- */
const CategoryCard = ({ cat, sel, toggle, setKg, cardRefs, disabled }) => {
  return (
    <motion.article
      className={`scrap-card ${sel.checked ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
      variants={cardVariants}
      whileHover={disabled ? {} : "hover"}
      ref={(el) => (cardRefs.current[cat.key] = el)}
      onClick={() => !disabled && toggle(cat.key)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => !disabled && e.key === "Enter" && toggle(cat.key)}
    >
      <div className="card-top">
        <div className="icon-blob">{cat.label[0]}</div>

        <div className="card-title">
          <div className="label">{cat.label}</div>
          <div className="rate">
            ₹{cat.rate} <span className="per-kg">/kg</span>
          </div>
        </div>

        <div className="card-checkbox">
          <input
            type="checkbox"
            checked={sel.checked}
            disabled={disabled}
            onChange={(e) => {
              e.stopPropagation();
              if (!disabled) toggle(cat.key);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div className="card-body" onClick={(e) => e.stopPropagation()}>
        <div className="weight-input">
          <label>Approx weight (kg)</label>
          <input
            type="text"
            placeholder="e.g., 2.5"
            inputMode="decimal"
            value={sel.approxKg}
            disabled={!sel.checked || disabled}
            onChange={(e) => setKg(cat.key, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
        </div>
        <div className="card-note">
          Vendors verify on-site — price may change.
        </div>
      </div>
    </motion.article>
  );
};

/* --------------------------------------------------------------
   Main Booking Component
-------------------------------------------------------------- */
const Booking = () => {
  const navigate = useNavigate();
  const [isParty, setIsParty] = useState(false);
  const [address, setAddress] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [animationJson, setAnimationJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingAnimation, setPlayingAnimation] = useState(false);

  const cardRefs = useRef({});

  const [selected, setSelected] = useState(() =>
    Object.fromEntries(
      CATEGORIES.map((c) => [c.key, { checked: false, approxKg: "" }])
    )
  );

  // -------------------------------------------- auth check
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.info("Please log in to book a service.");
      navigate("/login");
    }
  }, [navigate]);

  // -------------------------------------------- load lottie once
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://assets10.lottiefiles.com/packages/lf20_bz0jdah9.json"
        );
        setAnimationJson(res.data);
      } catch {
        // silently fail, booking still works without lottie
      }
    })();
  }, []);

  // -------------------------------------------- animation on card
  const pulseCard = (key) => {
    const el = cardRefs.current[key];
    if (!el) return;
    anime({
      targets: el,
      scale: [1, 1.04, 1],
      duration: 320,
      easing: "easeOutQuad",
    });
  };

  // -------------------------------------------- toggle category
  const toggleCategory = (key) => {
    setSelected((prev) => ({
      ...prev,
      [key]: { ...prev[key], checked: !prev[key].checked },
    }));
    pulseCard(key);
  };

  // -------------------------------------------- set weight
  const setKg = (key, val) => {
    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setSelected((prev) => ({
        ...prev,
        [key]: { ...prev[key], approxKg: val },
      }));
    }
  };

  // -------------------------------------------- estimated price
  const estimated = useMemo(() => {
    if (isParty) return 0; // party cleaning is quoted separately
    return CATEGORIES.reduce((sum, c) => {
      const s = selected[c.key];
      return s.checked ? sum + (Number(s.approxKg) || 0) * c.rate : sum;
    }, 0);
  }, [selected, isParty]);

  // -------------------------------------------- submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!address.trim()) return toast.error("Enter an address.");
    if (!timeSlot) return toast.error("Pick a time slot.");

    // Scrap validation
    let scrapDetails = [];
    let totalKg = 0;

    if (!isParty) {
      scrapDetails = CATEGORIES.filter((c) => selected[c.key].checked)
        .filter((c) => Number(selected[c.key].approxKg) > 0)
        .map((c) => ({
          material: c.key,
          approxKg: Number(selected[c.key].approxKg),
          ratePerKg: c.rate,
        }));

      totalKg = scrapDetails.reduce((sum, s) => sum + s.approxKg, 0);

      if (!scrapDetails.length || totalKg <= 0) {
        return toast.error("Select at least one scrap type with weight.");
      }
    }

    const payload = {
      wasteType: isParty ? "partyCleaning" : "scrap",
      quantity: totalKg || 1,
      address: address.trim(),
      pickupDate: timeSlot,
      scrapDetails: scrapDetails.length ? scrapDetails : undefined,
    };

    try {
      setLoading(true);
      await api.post("/waste/requests/create", payload);

      toast.success(
        isParty
          ? "Party cleanup booked — we’ll handle the chaos 🎉"
          : "Booking created — making Earth greener 🌱"
      );
      setPlayingAnimation(true);

      setTimeout(() => {
        setPlayingAnimation(false);
        setLoading(false);
        resetForm();
        navigate("/");
      }, 3800);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAddress("");
    setTimeSlot("");
    setIsParty(false);
    setSelected(
      Object.fromEntries(
        CATEGORIES.map((c) => [c.key, { checked: false, approxKg: "" }])
      )
    );
  };

  /* -------------------------------------------------------------- */
  return (
    <div className="booking-page">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="booking-header"
        >
          <h1>Book a Pickup</h1>
          <p className="subtitle">
            Your scrap, our problem. Clean spaces in just a few taps.
          </p>
        </motion.header>

        <motion.section
          className="booking-card-grid-wrap"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* LEFT SIDE - scrap cards */}
          <div className="cards-column">
            <div className="cards-header">
              <h2>Scrap categories</h2>
              <p>
                Choose what you’re sending out.{" "}
                <span>Ignore this if you’re booking party cleaning.</span>
              </p>
            </div>

            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.key}
                cat={cat}
                sel={selected[cat.key]}
                toggle={toggleCategory}
                setKg={setKg}
                cardRefs={cardRefs}
                disabled={isParty}
              />
            ))}
          </div>

          {/* RIGHT SIDE */}
          <aside className="booking-side">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel"
            >
              <div className="toggle-row">
                <button
                  className={`pill ${!isParty ? "active" : ""}`}
                  type="button"
                  onClick={() => setIsParty(false)}
                >
                  Scrap Pickup
                </button>
                <button
                  className={`pill ${isParty ? "active" : ""}`}
                  type="button"
                  onClick={() => setIsParty(true)}
                >
                  Party Cleaning
                </button>
              </div>

              {isParty && (
                <div className="party-note">
                  After you confirm, our team shares a quick quote based on your
                  location & venue size. No surprise fees.
                </div>
              )}

              <form onSubmit={handleSubmit} className="booking-form">
                <label>Pickup address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  required
                  placeholder="Flat / Street / Landmark"
                />

                <label>Preferred date & time</label>
                <input
                  type="datetime-local"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                />

                <div className="summary-row">
                  <div>
                    <div className="summary-label">
                      {isParty ? "Estimate" : "Estimated scrap value"}
                    </div>
                    <div className="summary-value">
                      {isParty ? "On quote" : `₹${estimated.toFixed(0)}`}
                    </div>
                  </div>
                  <div className="summary-note">
                    {isParty
                      ? "You’ll see the quote before confirming with vendor."
                      : "Final amount is confirmed by the vendor on pickup."}
                  </div>
                </div>

                <div className="form-actions">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? isParty
                        ? "Booking..."
                        : "Calculating..."
                      : isParty
                        ? "Book Party Cleaning"
                        : "Book Scrap Pickup"}
                  </motion.button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </motion.div>
          </aside>
        </motion.section>

        {/* Lottie overlay */}
        <AnimatePresence>
          {playingAnimation && animationJson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overlay-lottie"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="lottie-card"
              >
                <Player
                  autoplay
                  keepLastFrame
                  src={animationJson}
                  style={{ height: 260, width: 260 }}
                />
                <div className="lottie-text">
                  Thanks — one step closer to a cleaner city 🌱
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking;
