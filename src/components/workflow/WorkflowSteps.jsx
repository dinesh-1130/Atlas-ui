import React from "react";

const WorkflowSteps = ({ currentStep }) => {
  const stepNames = ["Query", "Plan", "Confirm", "Execute"];

  return (
    <div className="mb-6 sm:mb-8 overflow-x-hidden">
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col space-y-3 sm:hidden">
        {stepNames.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index <= currentStep
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-3 text-sm ${
                index <= currentStep ? "text-black" : "text-gray-500"
              }`}
            >
              {step}
            </span>
            {index <= currentStep && index < currentStep && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden sm:flex items-center justify-between">
        {stepNames.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 text-sm ${
                index <= currentStep ? "text-black" : "text-gray-500"
              }`}
            >
              {step}
            </span>
            {index < stepNames.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  index < currentStep ? "bg-black" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowSteps;
