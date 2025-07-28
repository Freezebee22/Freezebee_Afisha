import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { useEffect } from "react";
import { Preloader } from "../preloader";

export const ProtectedRoute = ({adminOnly = false}) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector(store => store.userReducer);
  const isAdmin = useSelector(store => store.userReducer.data.role === "admin");

 
  if (!isAuthChecked) return <Preloader />;

  if (!isAuthenticated) return <Navigate to="/login" state={{from: location}} replace />;

  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
};
