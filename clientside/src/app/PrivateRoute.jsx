import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuthContext(); // Access user and loading

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
