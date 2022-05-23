import { Navigate, Outlet } from "react-router-dom";
import isExpired from "../Support/isExpired";

const PublicRoute = () => {
  const isAuth = isExpired(localStorage.getItem("token"));
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
