import { CSSProperties, FunctionComponent, ReactNode } from "react";
import s from "./style.module.css";
interface ButtonDefaultProps {
  handlClick?: () => void;
  children?: ReactNode;
  styles?: CSSProperties;
}

const ButtonDefault: FunctionComponent<ButtonDefaultProps> = ({
  children,
  styles,
  handlClick,
}) => {
  return (
    <button className={s["button-default"]} onClick={handlClick} style={styles}>
      {children}
    </button>
  );
};

interface ButtonIconProps extends ButtonDefaultProps {
  icon: string;
}

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  icon,
  handlClick,
  styles,
}) => {
  return (
    <button className={s["button-icon"]} style={styles} onClick={handlClick}>
      <img src={icon} alt="" />
    </button>
  );
};

export { ButtonDefault, ButtonIcon };
