import React from "react";

export const Typography = ({ variant, children }) => {
  if (variant === "title") {
    return <h1 className="title">{children}</h1>;
  }

  if (variant === "subtitle") {
    return <h2 className="subtitle">{children}</h2>;
  }

  if (variant === "paragraph") {
    return <p className="paragraph">{children}</p>;
  }

  if (variant === "label") {
    return <span className="label">{children}</span>;
  }

  return <div>{children}</div>;
};
