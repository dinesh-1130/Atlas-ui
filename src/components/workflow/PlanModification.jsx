// import React, { useState } from "react";
// import Card from "../common/Card";
// import Input from "../common/Input";
// import Button from "../common/Button";

// const PlanModification = ({ plan, onSave, onCancel }) => {
//   const [modifiedPlan, setModifiedPlan] = useState([...plan]);

//   const handleStepChange = (index, value) => {
//     const newPlan = [...modifiedPlan];
//     newPlan[index] = value;
//     setModifiedPlan(newPlan);
//   };

//   const addStep = () => {
//     setModifiedPlan([...modifiedPlan, "New step"]);
//   };

//   const removeStep = (index) => {
//     const newPlan = modifiedPlan.filter((_, i) => i !== index);
//     setModifiedPlan(newPlan);
//   };

//   return (
//     <Card className="p-6">
//       <h3 className="font-semibold text-lg mb-4">Modify Execution Plan</h3>
//       <div className="space-y-4 mb-6">
//         {modifiedPlan.map((step, index) => (
//           <div key={index} className="flex items-center space-x-3">
//             <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
//               {index + 1}
//             </div>
//             <Input
//               value={step}
//               onChange={(e) => handleStepChange(index, e.target.value)}
//               className="flex-1"
//             />
//             <Button
//               variant="ghost"
//               onClick={() => removeStep(index)}
//               className="text-red-600 hover:bg-red-50 px-2"
//             >
//               ×
//             </Button>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between items-center mb-6">
//         <Button variant="ghost" onClick={addStep}>
//           + Add Step
//         </Button>
//       </div>
//       <div className="flex space-x-3">
//         <Button onClick={() => onSave(modifiedPlan)}>Save Changes</Button>
//         <Button variant="secondary" onClick={onCancel}>
//           Cancel
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default PlanModification;
import React, { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

const PlanModification = ({ plan, onSave, onCancel, loading }) => {
  const [modifiedPlan, setModifiedPlan] = useState([...plan]);

  const handleStepChange = (index, value) => {
    const newPlan = [...modifiedPlan];
    newPlan[index] = value;
    setModifiedPlan(newPlan);
  };

  const addStep = () => {
    setModifiedPlan([...modifiedPlan, "New step"]);
  };

  const removeStep = (index) => {
    const newPlan = modifiedPlan.filter((_, i) => i !== index);
    setModifiedPlan(newPlan);
  };

  const handleSave = () => {
    if (onSave && typeof onSave === "function") {
      onSave(modifiedPlan);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Modify Execution Plan</h3>
      <div className="space-y-4 mb-6">
        {modifiedPlan.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <Input
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              onClick={() => removeStep(index)}
              className="text-red-600 hover:bg-red-50 px-2"
              disabled={loading || modifiedPlan.length <= 1}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={addStep} disabled={loading}>
          + Add Step
        </Button>
      </div>
      <div className="flex space-x-3">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default PlanModification;
