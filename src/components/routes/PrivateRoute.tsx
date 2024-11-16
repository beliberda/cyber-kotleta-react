import UserStore from "@/components/store/UserStore";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  return UserStore.isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
