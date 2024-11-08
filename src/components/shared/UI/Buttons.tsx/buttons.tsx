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

export default ButtonDefault;
