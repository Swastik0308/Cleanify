import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../client/src/pages/Home/Home";
import Login from "../../client/src/pages/Auth/Login";
import Register from "../../client/src/pages/Auth/Register";
import CustomerDashboard from "../../client/src/pages/Customer/CustomerDashboard";
import PrivateRoute from "./PrivateRoute";
import VendorDashboard from "../pages/Vendor/VendorDashboard.jsx";
import PrivateVendorRoute from "../utils/PrivateVendorRoute.jsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/vendor/dashboard"
          element={
            <PrivateVendorRoute>
              <VendorDashboard />
            </PrivateVendorRoute>
          }
        />
      </Routes>
    </Router>
  );
}
