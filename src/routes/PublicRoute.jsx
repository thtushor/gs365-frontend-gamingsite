import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Redirect logged-in users to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
