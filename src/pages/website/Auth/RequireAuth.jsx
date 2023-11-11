import { useContext } from "react";
import { User } from "../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const user = useContext(User);
  const location = useLocation();

  return user?.auth?.userDetails ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default RequireAuth;
