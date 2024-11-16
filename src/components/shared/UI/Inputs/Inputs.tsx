import { CSSProperties, FunctionComponent } from "react";
import s from "./style.module.css";
interface InputDefaultProps {
  handleInputChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: CSSProperties;
  label?: string;
  type?: string;
  className?: string;
}

const InputDefault: FunctionComponent<InputDefaultProps> = ({
  handleInputChange,
  label,
  placeholder,
  styles,
  type,
  className = "",
}) => {
  return (
    <label className={s.label}>
      {label}
      <input
        onChange={handleInputChange}
        type={type || "text"}
        placeholder={placeholder}
        style={styles}
        className={className}
      />
    </label>
  );
};

export { InputDefault };
