import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "../../services/store";
import { useEffect } from "react";
import { Preloader } from "../preloader";

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthChecked } = useSelector(store => store.userReducer);

 
  if (!isAuthChecked) return <Preloader />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
