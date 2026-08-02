import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user logged in hai, toh children (ya child routes) render kar do
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
