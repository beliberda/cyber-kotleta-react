import UserStore from "@/components/store/UserStore";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  return UserStore.isAuth || localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
