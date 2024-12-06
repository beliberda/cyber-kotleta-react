import { Fragment, FunctionComponent } from "react";
import s from "./style.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ButtonIcon } from "@/components/shared/UI/Buttons.tsx/buttons";
import logout from "@assets/icons/logout.svg";
import UserStore from "@/components/store/UserStore";

type TNav = {
  title: string;
  path: string;
};
interface HeaderProps {
  navigations: TNav[];
  isLogoutActive?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({
  navigations,
  isLogoutActive = true,
}) => {
  const nav = useNavigate();
  const handleLogout = () => {
    UserStore.logout();
    nav("/");
  };

  return (
    <>
      <header className={s.header + " container"}>
        <div></div>
        <nav>
          {navigations.map((nav) => (
            <Fragment key={nav.path}>
              <NavLink
                className={({ isActive }) => (isActive ? s.active : s.nav)}
                to={nav.path}
              >
                {nav.title}
              </NavLink>
            </Fragment>
          ))}
        </nav>
        {isLogoutActive ? (
          <ButtonIcon handlClick={handleLogout} icon={logout} />
        ) : (
          <div></div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Header;
