import { CSSProperties, FunctionComponent, ReactNode } from "react";
import s from "./style.module.css";
interface ButtonDefaultProps {
  handlClick?: () => void;
  children?: ReactNode;
  styles?: CSSProperties;
  disabled?: boolean;
}

const ButtonDefault: FunctionComponent<ButtonDefaultProps> = ({
  children,
  styles,
  handlClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={s["button-default"]}
      onClick={handlClick}
      style={styles}
    >
      {children}
    </button>
  );
};

interface ButtonIconProps extends ButtonDefaultProps {
  icon?: string;
}

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  icon,
  handlClick,
  styles,
  children,
}) => {
  return (
    <button className={s["button-icon"]} style={styles} onClick={handlClick}>
      {icon && <img src={icon} alt="" />}

      {children}
    </button>
  );
};

export { ButtonDefault, ButtonIcon };
