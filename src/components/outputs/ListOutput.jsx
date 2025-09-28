import React from "react";

const ListOutput = ({ data }) => (
  <div className="space-y-2">
    <h3 className="font-semibold text-lg mb-4">{data.title}</h3>
    <div className="space-y-2">
      {data.items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-3 bg-gray-50 border-l-4 border-black"
        >
          <div>
            <p className="font-medium">{item.description}</p>
            <p className="text-sm text-gray-600">
              {item.domain} • {item.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListOutput;
