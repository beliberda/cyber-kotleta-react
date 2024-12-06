import UserStore from "@/components/store/UserStore";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  return UserStore.isAuth || localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default observer(PrivateRoute);
