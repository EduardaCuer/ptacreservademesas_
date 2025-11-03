import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("rm_auth_token_v1") || "null");
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
