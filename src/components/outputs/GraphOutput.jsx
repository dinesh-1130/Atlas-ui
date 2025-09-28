import React from "react";

const GraphOutput = ({ data }) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{data.title}</h3>
    <div className="space-y-2">
      {data.labels.map((label, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-24 text-sm">{label}</div>
          <div className="flex-1 bg-gray-200 h-6 relative">
            <div
              className="bg-black h-full"
              style={{ width: `${data.data[index]}%` }}
            ></div>
          </div>
          <div className="w-12 text-sm font-medium">{data.data[index]}%</div>
        </div>
      ))}
    </div>
  </div>
);

export default GraphOutput;
