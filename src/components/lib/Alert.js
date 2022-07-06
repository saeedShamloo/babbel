import React from "react";
import mergeClassNames from "classnames";

export const Alert = ({ variant, children, action, ...rest }) => {
  const classNames = mergeClassNames("alert", {
    "alert-success": variant === "success",
  });

  return (
    <div className={classNames} role="alert" {...rest}>
      {children}
      {action}
    </div>
  );
};
