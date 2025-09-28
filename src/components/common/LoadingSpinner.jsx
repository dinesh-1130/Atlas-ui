import React from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
