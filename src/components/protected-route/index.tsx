import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "../../services/store";

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthChecked } = useSelector(store => store.userReducer);

  if (!isAuthChecked) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
