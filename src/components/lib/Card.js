import React from "react";
import { Typography } from "./Typography";

export const Card = ({ title, avatar, children, action, ...rest }) => {
  return (
    <div className="card" {...rest}>
      <div className="card-title">
        <Typography variant="subtitle">{title}</Typography>
      </div>
      {avatar && (
        <div className="card-avatar">
          <img src={avatar} alt={title} role="img" aria-label={title} />
        </div>
      )}
      <div className="card-content">{children}</div>
      <div className="card-action">{action}</div>
    </div>
  );
};
