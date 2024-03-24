import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  return user.token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
