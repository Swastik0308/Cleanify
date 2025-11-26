// import { Navigate } from "react-router-dom";

// const PrivateVendorRoute = ({ children }) => {
//   const token = localStorage.getItem("vendorToken");

//   return token ? children : <Navigate to="/vendor/login" replace />;
// };

// export default PrivateVendorRoute;

import { Navigate } from "react-router-dom";

const PrivateVendorRoute = ({ children }) => {
  const token = localStorage.getItem("vendorToken");
  return token ? children : <Navigate to="/vendor/login" replace />;
};

export default PrivateVendorRoute;
