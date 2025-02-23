import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext);
  console.log("route",user);
  
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== "HR") return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
