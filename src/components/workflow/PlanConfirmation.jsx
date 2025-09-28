import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";

const PlanConfirmation = ({ plan, onConfirm, onModify, onCancel, loading }) => (
  <Card className="p-6">
    <h3 className="font-semibold text-lg mb-4">Execution Plan</h3>
    <div className="space-y-2 mb-6">
      {plan.map((step, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
            {index + 1}
          </div>
          <p className="text-gray-700">{step}</p>
        </div>
      ))}
    </div>
    <div className="flex space-x-3">
      <Button onClick={onConfirm} disabled={loading}>
        {loading ? "Executing..." : "Confirm & Execute"}
      </Button>
      <Button variant="secondary" onClick={onModify} disabled={loading}>
        Modify Plan
      </Button>
      <Button variant="ghost" onClick={onCancel} disabled={loading}>
        Cancel
      </Button>
    </div>
  </Card>
);

export default PlanConfirmation;
