import React from "react";
import "./Button.css";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional additional styling
   */
  className?: string;
}

export const Button = ({ primary = false, backgroundColor, label, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`${primary ? "primaryButton" : "secondaryButton"} highlight ${className}`}
      style={{ backgroundColor }}
      {...props}>
      {label}
    </button>
  );
};
