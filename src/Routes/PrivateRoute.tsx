import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PublicRouteProps } from "./PublicRoute";
import { selectIsLoggedIn } from "../Redux/auth/auth-selectors";

const PrivateRoute = ({
  component,
  redirectTo = "/login",
}: PublicRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
