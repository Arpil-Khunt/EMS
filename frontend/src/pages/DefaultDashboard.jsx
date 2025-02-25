import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DefaultDashboard = () => {
  const { user, loading } = useAuth();

  if (!loading) {
    if (user && user.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (user && user.role === "employee") {
      return <Navigate to="/employee-dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default DefaultDashboard;
