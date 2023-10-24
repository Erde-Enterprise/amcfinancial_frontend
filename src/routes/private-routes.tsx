import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/auth";

function PrivateRoute() {
  const { user } = useContext(AuthContext);

  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;

