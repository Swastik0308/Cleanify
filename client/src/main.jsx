// // import React from "react";
// // import { createRoot } from "react-dom/client";
// // import { BrowserRouter } from "react-router-dom";
// // import App from "./App";
// // import "./styles/main.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css";

// // createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       <App />
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./styles/main.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./styles/main.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import "./styles/main.css"; // optional, but make sure file exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
