import React from "react";

const Input = ({
  placeholder,
  value,
  onChange,
  onKeyPress,
  className = "",
}) => (
  <input
    type="text"
    className={`w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
);

export default Input;
