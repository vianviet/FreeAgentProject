import { message } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import isExpired from "../Support/isExpired";

const PrivateRoute = () => {
  const isAuth = isExpired(localStorage.getItem("token"));
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
