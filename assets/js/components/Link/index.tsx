import React from "react";

import * as Router from "react-router-dom";

export function Link({ to, children }) {
  return (
    <Router.Link
      to={to}
      className="text-link-base hover:text-link-hover underline underline-offset-1 cursor-pointer transition-colors"
    >
      {children}
    </Router.Link>
  );
}
