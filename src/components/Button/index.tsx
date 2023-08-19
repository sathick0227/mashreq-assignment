import React, { MouseEvent } from "react";
import "./button.css";
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: React.CSSProperties | any;
  isDisabled?: boolean;
  value: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  txtColor?: string;
};

function Button({
  type,
  className,
  style,
  isDisabled,
  value,
  onClick,
  color,
  txtColor,
}: ButtonProps) {
  const btnStyle = {
    backgroundColor: color,
    color: txtColor,
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  const allStyle = { ...style, ...btnStyle };
  const disableBtn = !isDisabled ? "btn-primary" : "btn-disabled";

  return (
    <button
      type={type}
      className={
        className != null ? `${className} ${disableBtn}` : "default-btn"
      }
      style={allStyle}
      disabled={isDisabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Button;
