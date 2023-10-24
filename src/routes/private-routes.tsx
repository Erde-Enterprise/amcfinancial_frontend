import { ElementType, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/auth";

 interface PrivateRouteProps {
   component: ElementType;
 }

function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);

  return user?.token ? <Component /> : <Navigate to="/login" replace />;
}



export default PrivateRoute;

