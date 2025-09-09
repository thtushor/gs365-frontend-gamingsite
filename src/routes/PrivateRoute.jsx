import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  console.log(location);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (
    user &&
    (location.pathname === "/affiliate-signup" ||
      location.pathname === "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
