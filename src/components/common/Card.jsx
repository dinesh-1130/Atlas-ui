import React from "react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export default Card;
