import { Fragment, FunctionComponent } from "react";
import s from "./style.module.css";
import { NavLink } from "react-router-dom";

type TNav = {
  title: string;
  path: string;
};
interface HeaderProps {
  navigations: TNav[];
  isLogoutActive?: boolean;
}

const Sidebar: FunctionComponent<HeaderProps> = ({ navigations }) => {
  return (
    <aside className={s.sidebar}>
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
    </aside>
  );
};

export default Sidebar;
