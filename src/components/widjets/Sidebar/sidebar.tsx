import { FormEvent, Fragment, FunctionComponent } from "react";
import s from "./style.module.css";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "@/components/store/UserStore";

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
    <>
      <label className={s.label}>
        <input
          onChange={(e: FormEvent<HTMLInputElement>) =>
            UserStore.setIsOpenSidebar(e.currentTarget.checked)
          }
          checked={UserStore.isOpenSidebar}
          type="checkbox"
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
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
    </>
  );
};

export default observer(Sidebar);
