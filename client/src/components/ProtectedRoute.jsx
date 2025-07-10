import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ token, children, redirectTo = "/sign-in" }) => {
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};