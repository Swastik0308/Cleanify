import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and store the original page user tried to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Redirect if user doesn't have the required role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
