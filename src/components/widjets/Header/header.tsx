import { Fragment, FunctionComponent } from "react";
import s from "./style.module.css";
import { NavLink } from "react-router-dom";
type TNav = {
  title: string;
  path: string;
};
interface HeaderProps {
  navigations: TNav[];
}

const Header: FunctionComponent<HeaderProps> = ({ navigations }) => {
  return (
    <header className={s.header + " container"}>
      {navigations.map((nav) => (
        <Fragment key={nav.path}>
          <NavLink to={nav.path}>{nav.title}</NavLink>
        </Fragment>
      ))}
    </header>
  );
};

export default Header;
