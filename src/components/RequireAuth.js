import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.userId ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

