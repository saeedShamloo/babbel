import React from "react";
import mergeClassNames from "classnames";

export const Button = ({
  children,
  onClick,
  disabled,
  varinat = "primary",
  fullWidth = false,
}) => {
  const classNames = mergeClassNames(
    "btn",
    { "btn-primary": varinat === "primary" },
    { "btn-success": varinat === "success" },
    { "full-width": fullWidth }
  );

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type="button"
      tabIndex={0}
    >
      {children}
    </button>
  );
};
