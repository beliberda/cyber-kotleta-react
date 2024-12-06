import { FunctionComponent } from "react";

interface ArrowIconProps {
  color?: string;
  degrees?: number;
}

const ArrowIcon: FunctionComponent<ArrowIconProps> = ({
  color = "black",
  degrees = 0,
}) => {
  return (
    <svg
      style={{ transform: `rotate(${degrees}deg)` }}
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 4V20M12 4L8 8M12 4L16 8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default ArrowIcon;
