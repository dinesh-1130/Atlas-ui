import React from "react";

const TextOutput = ({ data }) => (
  <div className="prose max-w-none">
    <p className="text-gray-700 leading-relaxed">{data.content}</p>
  </div>
);

export default TextOutput;
