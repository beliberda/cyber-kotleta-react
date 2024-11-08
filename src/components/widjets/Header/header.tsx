import { Fragment, FunctionComponent } from "react";
import s from "./style.module.css";
import { NavLink } from "react-router-dom";

interface HeaderProps {}

const navigatins = [
  {
    title: "Тест 1",
    path: "/",
  },
  {
    title: "Тест 2",
    path: "/test2",
  },
  {
    title: "Тест 3",
    path: "/test3",
  },
];

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className={s.header + " container"}>
      {navigatins.map((nav) => (
        <Fragment key={nav.path}>
          <NavLink to={nav.path}>{nav.title}</NavLink>
        </Fragment>
      ))}
    </header>
  );
};

export default Header;
