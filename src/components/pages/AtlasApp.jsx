// // import React, { useState, useEffect } from "react";
// // import api from "../../api/mockApi.js";

// // import Button from "../common/Button.jsx";
// // import LoadingSpinner from "../common/LoadingSpinner.jsx";
// // import WorkflowSteps from "../workflow/WorkflowSteps.jsx";
// // import PlanConfirmation from "../workflow/PlanConfirmation.jsx";
// // import PlanModification from "../workflow/PlanModification.jsx";
// // import OutputRenderer from "../outputs/OutputRenderer.jsx";
// // import ChatBox from "../chat/ChatBox.jsx";
// // import NotebooksList from "../notebooks/NotebooksList.jsx";

// // function AtlasApp() {
// //   const [currentView, setCurrentView] = useState("home");
// //   const [notebooks, setNotebooks] = useState([]);
// //   const [currentNotebook, setCurrentNotebook] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [workflowStep, setWorkflowStep] = useState(0);
// //   const [isModifying, setIsModifying] = useState(false);
// //   const [executionProgress, setExecutionProgress] = useState(0);

// //   const managerId = "manager-123";

// //   useEffect(() => {
// //     loadNotebooks();
// //   }, []);

// //   const loadNotebooks = async () => {
// //     try {
// //       const data = await api.getNotebooks(managerId);
// //       setNotebooks(data.notebooks);
// //     } catch (error) {
// //       console.error("Failed to load notebooks:", error);
// //     }
// //   };

// //   const handleQuerySubmit = async (query) => {
// //     setLoading(true);

// //     // Check if this query already exists (case-insensitive, trimmed)
// //     const existingNotebook = notebooks.find(
// //       (nb) => nb.query.toLowerCase().trim() === query.toLowerCase().trim()
// //     );

// //     if (existingNotebook) {
// //       // Open existing notebook instead of creating new one
// //       console.log("Found existing notebook:", existingNotebook.notebookId);
// //       await handleNotebookSelect(existingNotebook.notebookId);
// //       setLoading(false);
// //       return;
// //     }

// //     // If no existing notebook found, create a new one
// //     setWorkflowStep(1);
// //     setExecutionProgress(0);
// //     setIsModifying(false);

// //     try {
// //       const notebook = await api.submitQuery(query, managerId);
// //       setCurrentNotebook(notebook);
// //       setCurrentView("notebook");
// //       setWorkflowStep(1); // Plan generated, waiting for confirmation
// //     } catch (error) {
// //       console.error("Failed to submit query:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   const handlePlanConfirm = async () => {
// //     if (!currentNotebook) return;

// //     setLoading(true);
// //     setWorkflowStep(2); // Executing
// //     setExecutionProgress(0);

// //     try {
// //       // First, confirm the plan (this returns "executing" status)
// //       const executingNotebook = await api.confirmPlan(
// //         currentNotebook.notebookId,
// //         managerId
// //       );

// //       // Update notebook status to executing
// //       setCurrentNotebook((prev) => ({
// //         ...prev,
// //         status: "executing",
// //       }));

// //       // Simulate execution progress
// //       const progressInterval = setInterval(() => {
// //         setExecutionProgress((prev) => {
// //           if (prev >= 90) {
// //             clearInterval(progressInterval);
// //             return 100;
// //           }
// //           return prev + 10;
// //         });
// //       }, 200);

// //       // Wait for the progress to complete, then get final results
// //       setTimeout(async () => {
// //         try {
// //           const completedNotebook = await api.getNotebook(
// //             currentNotebook.notebookId
// //           );
// //           setCurrentNotebook(completedNotebook);
// //           setWorkflowStep(3); // Completed
// //           setExecutionProgress(100);
// //           loadNotebooks(); // refresh list
// //           setLoading(false);
// //         } catch (error) {
// //           console.error("Failed to get completed notebook:", error);
// //           setLoading(false);
// //         }
// //       }, 2000); // Wait 2 seconds for progress animation
// //     } catch (error) {
// //       console.error("Failed to execute plan:", error);
// //       setLoading(false);
// //     }
// //   };

// //   const handlePlanModify = () => {
// //     setIsModifying(true);
// //   };

// //   const handlePlanSave = async (modifiedPlan) => {
// //     setLoading(true);
// //     try {
// //       // Update the current notebook with modified plan
// //       setCurrentNotebook((prev) => ({
// //         ...prev,
// //         plan: modifiedPlan,
// //       }));
// //       setIsModifying(false);
// //     } catch (error) {
// //       console.error("Failed to save plan:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePlanCancel = () => {
// //     setIsModifying(false);
// //   };

// //   const handleNotebookSelect = async (notebookId) => {
// //     setLoading(true);
// //     setIsModifying(false);

// //     try {
// //       const notebook = await api.getNotebook(notebookId);
// //       setCurrentNotebook(notebook);
// //       setCurrentView("notebook");
// //       setWorkflowStep(3); // Completed notebook
// //       setExecutionProgress(100);
// //     } catch (error) {
// //       console.error("Failed to load notebook:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBackToHome = () => {
// //     setCurrentView("home");
// //     setCurrentNotebook(null);
// //     setWorkflowStep(0);
// //     setIsModifying(false);
// //     setExecutionProgress(0);
// //   };

// //   const renderNotebookContent = () => {
// //     if (loading && workflowStep === 1) {
// //       return (
// //         <div className="text-center">
// //           <LoadingSpinner />
// //           <p className="mt-4 text-gray-600">Generating execution plan...</p>
// //         </div>
// //       );
// //     }

// //     if (isModifying) {
// //       return (
// //         <PlanModification
// //           plan={currentNotebook.plan}
// //           onSave={handlePlanSave}
// //           onCancel={handlePlanCancel}
// //           loading={loading}
// //         />
// //       );
// //     }

// //     if (currentNotebook.status === "plan_generated" && !loading) {
// //       return (
// //         <PlanConfirmation
// //           plan={currentNotebook.plan}
// //           onConfirm={handlePlanConfirm}
// //           onModify={handlePlanModify}
// //           onCancel={handleBackToHome}
// //           loading={loading}
// //         />
// //       );
// //     }

// //     if (
// //       currentNotebook.status === "executing" ||
// //       (loading && workflowStep === 2)
// //     ) {
// //       return (
// //         <div className="text-center space-y-4">
// //           <LoadingSpinner />
// //           <div className="max-w-md mx-auto">
// //             <p className="text-gray-600 mb-2">Executing plan...</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2">
// //               <div
// //                 className="bg-black h-2 rounded-full transition-all duration-300"
// //                 style={{ width: `${executionProgress}%` }}
// //               ></div>
// //             </div>
// //             <p className="text-sm text-gray-500 mt-1">
// //               {executionProgress}% complete
// //             </p>
// //           </div>
// //         </div>
// //       );
// //     }

// //     if (currentNotebook.status === "completed" && currentNotebook.output) {
// //       return (
// //         <div className="space-y-6">
// //           <div className="bg-green-50 border-l-4 border-green-400 p-4">
// //             <div className="flex items-center">
// //               <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3">
// //                 <span className="text-white text-xs">✓</span>
// //               </div>
// //               <p className="text-green-800 font-medium">
// //                 Analysis completed successfully!
// //               </p>
// //             </div>
// //           </div>
// //           <OutputRenderer outputs={currentNotebook.output} />
// //         </div>
// //       );
// //     }

// //     return null;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-4">
// //               <h1 className="text-2xl font-bold">Atlas</h1>
// //               <span className="text-gray-500">by Mercer Labs</span>
// //             </div>
// //             {currentView === "notebook" && (
// //               <Button variant="ghost" onClick={handleBackToHome}>
// //                 ← Back to Home
// //               </Button>
// //             )}
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-6 py-8">
// //         {currentView === "home" && (
// //           <div className="space-y-8">
// //             <div className="text-center">
// //               <h2 className="text-3xl font-bold mb-4">
// //                 Automate Your Day-to-Day Tasks
// //               </h2>
// //               <p className="text-gray-600 max-w-2xl mx-auto">
// //                 Transform natural language queries into actionable insights
// //                 using integrated data from Slack, Jira, and Google Drive.
// //               </p>
// //             </div>

// //             <div className="flex gap-8">
// //               <div className="w-1/2">
// //                 <ChatBox onSubmit={handleQuerySubmit} loading={loading} />
// //               </div>
// //               <div className="w-1/2">
// //                 <NotebooksList
// //                   notebooks={notebooks}
// //                   onSelect={handleNotebookSelect}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {currentView === "notebook" && currentNotebook && (
// //           <div className="space-y-8">
// //             {/* Notebook Header */}
// //             <div className="bg-white p-6 border border-gray-200 shadow-sm">
// //               <h2 className="text-2xl font-bold mb-2">
// //                 {currentNotebook.query}
// //               </h2>
// //               <div className="flex items-center justify-between">
// //                 <p className="text-gray-600">
// //                   Notebook ID: {currentNotebook.notebookId}
// //                 </p>
// //                 <div className="flex items-center space-x-2">
// //                   <div
// //                     className={`w-3 h-3 rounded-full ${
// //                       currentNotebook.status === "completed"
// //                         ? "bg-green-400"
// //                         : currentNotebook.status === "executing"
// //                         ? "bg-yellow-400"
// //                         : "bg-blue-400"
// //                     }`}
// //                   ></div>
// //                   <span className="text-sm font-medium capitalize">
// //                     {currentNotebook.status === "plan_generated"
// //                       ? "Plan Ready"
// //                       : currentNotebook.status === "executing"
// //                       ? "Executing"
// //                       : "Completed"}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <WorkflowSteps currentStep={workflowStep} />

// //             {/* Dynamic Content */}
// //             <div className="min-h-[400px]">{renderNotebookContent()}</div>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // export default AtlasApp;
// import React, { useState, useEffect } from "react";
// import api from "../../api/mockApi.js";

// import Button from "../common/Button.jsx";
// import LoadingSpinner from "../common/LoadingSpinner.jsx";
// import WorkflowSteps from "../workflow/WorkflowSteps.jsx";
// import PlanConfirmation from "../workflow/PlanConfirmation.jsx";
// import PlanModification from "../workflow/PlanModification.jsx";
// import OutputRenderer from "../outputs/OutputRenderer.jsx";
// import ChatBox from "../chat/ChatBox.jsx";
// import NotebooksList from "../notebooks/NotebooksList.jsx";

// function AtlasApp() {
//   const [currentView, setCurrentView] = useState("home");
//   const [notebooks, setNotebooks] = useState([]);
//   const [currentNotebook, setCurrentNotebook] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [workflowStep, setWorkflowStep] = useState(0);
//   const [isModifying, setIsModifying] = useState(false);
//   const [executionProgress, setExecutionProgress] = useState(0);

//   const managerId = "manager-123";

//   useEffect(() => {
//     loadNotebooks();
//   }, []);

//   const loadNotebooks = async () => {
//     try {
//       const data = await api.getNotebooks(managerId);
//       setNotebooks(data.notebooks);
//     } catch (error) {
//       console.error("Failed to load notebooks:", error);
//     }
//   };

//   const handleQuerySubmit = async (query) => {
//     setLoading(true);

//     // Check if this query already exists (case-insensitive, trimmed)
//     const existingNotebook = notebooks.find(
//       (nb) => nb.query.toLowerCase().trim() === query.toLowerCase().trim()
//     );

//     if (existingNotebook) {
//       // Open existing notebook instead of creating new one
//       console.log("Found existing notebook:", existingNotebook.notebookId);
//       await handleNotebookSelect(existingNotebook.notebookId);
//       setLoading(false);
//       return;
//     }

//     // If no existing notebook found, create a new one
//     setWorkflowStep(1);
//     setExecutionProgress(0);
//     setIsModifying(false);

//     try {
//       const notebook = await api.submitQuery(query, managerId);
//       setCurrentNotebook(notebook);
//       setCurrentView("notebook");
//       setWorkflowStep(1); // Plan generated, waiting for confirmation
//     } catch (error) {
//       console.error("Failed to submit query:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlanConfirm = async () => {
//     if (!currentNotebook) return;

//     setLoading(true);
//     setWorkflowStep(2); // Executing
//     setExecutionProgress(0);

//     try {
//       // First, confirm the plan (this returns "executing" status)
//       const executingNotebook = await api.confirmPlan(
//         currentNotebook.notebookId,
//         managerId
//       );

//       // Update notebook status to executing
//       setCurrentNotebook((prev) => ({
//         ...prev,
//         status: "executing",
//       }));

//       // Simulate execution progress
//       const progressInterval = setInterval(() => {
//         setExecutionProgress((prev) => {
//           if (prev >= 90) {
//             clearInterval(progressInterval);
//             return 100;
//           }
//           return prev + 10;
//         });
//       }, 200);

//       // Wait for the progress to complete, then get final results
//       setTimeout(async () => {
//         try {
//           const completedNotebook = await api.getNotebook(
//             currentNotebook.notebookId
//           );
//           setCurrentNotebook(completedNotebook);
//           setWorkflowStep(3); // Completed
//           setExecutionProgress(100);
//           loadNotebooks(); // refresh list
//           setLoading(false);
//         } catch (error) {
//           console.error("Failed to get completed notebook:", error);
//           setLoading(false);
//         }
//       }, 2000); // Wait 2 seconds for progress animation
//     } catch (error) {
//       console.error("Failed to execute plan:", error);
//       setLoading(false);
//     }
//   };

//   const handlePlanModify = () => {
//     setIsModifying(true);
//   };

//   const handlePlanSave = async (modifiedPlan) => {
//     setLoading(true);
//     try {
//       // Update the current notebook with modified plan
//       setCurrentNotebook((prev) => ({
//         ...prev,
//         plan: modifiedPlan,
//       }));
//       setIsModifying(false);
//     } catch (error) {
//       console.error("Failed to save plan:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlanCancel = () => {
//     setIsModifying(false);
//   };

//   const handleNotebookSelect = async (notebookId) => {
//     setLoading(true);
//     setIsModifying(false);

//     try {
//       const notebook = await api.getNotebook(notebookId);
//       setCurrentNotebook(notebook);
//       setCurrentView("notebook");
//       setWorkflowStep(3); // Completed notebook
//       setExecutionProgress(100);
//     } catch (error) {
//       console.error("Failed to load notebook:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     setCurrentView("home");
//     setCurrentNotebook(null);
//     setWorkflowStep(0);
//     setIsModifying(false);
//     setExecutionProgress(0);
//   };

//   const renderNotebookContent = () => {
//     if (loading && workflowStep === 1) {
//       return (
//         <div className="text-center">
//           <LoadingSpinner />
//           <p className="mt-4 text-gray-600">Generating execution plan...</p>
//         </div>
//       );
//     }

//     if (isModifying) {
//       return (
//         <PlanModification
//           plan={currentNotebook.plan}
//           onSave={handlePlanSave}
//           onCancel={handlePlanCancel}
//           loading={loading}
//         />
//       );
//     }

//     if (currentNotebook.status === "plan_generated" && !loading) {
//       return (
//         <PlanConfirmation
//           plan={currentNotebook.plan}
//           onConfirm={handlePlanConfirm}
//           onModify={handlePlanModify}
//           onCancel={handleBackToHome}
//           loading={loading}
//         />
//       );
//     }

//     if (
//       currentNotebook.status === "executing" ||
//       (loading && workflowStep === 2)
//     ) {
//       return (
//         <div className="text-center space-y-4">
//           <LoadingSpinner />
//           <div className="max-w-md mx-auto">
//             <p className="text-gray-600 mb-2">Executing plan...</p>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-black h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${executionProgress}%` }}
//               ></div>
//             </div>
//             <p className="text-sm text-gray-500 mt-1">
//               {executionProgress}% complete
//             </p>
//           </div>
//         </div>
//       );
//     }

//     if (currentNotebook.status === "completed" && currentNotebook.output) {
//       return (
//         <div className="space-y-6">
//           <div className="bg-green-50 border-l-4 border-green-400 p-4">
//             <div className="flex items-center">
//               <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white text-xs">✓</span>
//               </div>
//               <p className="text-green-800 font-medium">
//                 Analysis completed successfully!
//               </p>
//             </div>
//           </div>
//           <OutputRenderer outputs={currentNotebook.output} />
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-2xl font-bold">Atlas</h1>
//               <span className="text-gray-500">by Mercer Labs</span>
//             </div>
//             {currentView === "notebook" && (
//               <Button variant="ghost" onClick={handleBackToHome}>
//                 ← Back to Home
//               </Button>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {currentView === "home" && (
//           <div className="space-y-8">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold mb-4">
//                 Automate Your Day-to-Day Tasks
//               </h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Transform natural language queries into actionable insights
//                 using integrated data from Slack, Jira, and Google Drive.
//               </p>
//             </div>

//             <div className="flex gap-8">
//               <div className="w-1/2">
//                 <ChatBox onSubmit={handleQuerySubmit} loading={loading} />
//               </div>
//               <div className="w-1/2">
//                 <NotebooksList
//                   notebooks={notebooks}
//                   onSelect={handleNotebookSelect}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {currentView === "notebook" && currentNotebook && (
//           <div className="space-y-8">
//             {/* Notebook Header */}
//             <div className="bg-white p-6 border border-gray-200 shadow-sm">
//               <h2 className="text-2xl font-bold mb-2">
//                 {currentNotebook.query}
//               </h2>
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-600">
//                   Notebook ID: {currentNotebook.notebookId}
//                 </p>
//                 <div className="flex items-center space-x-2">
//                   <div
//                     className={`w-3 h-3 rounded-full ${
//                       currentNotebook.status === "completed"
//                         ? "bg-green-400"
//                         : currentNotebook.status === "executing"
//                         ? "bg-yellow-400"
//                         : "bg-blue-400"
//                     }`}
//                   ></div>
//                   <span className="text-sm font-medium capitalize">
//                     {currentNotebook.status === "plan_generated"
//                       ? "Plan Ready"
//                       : currentNotebook.status === "executing"
//                       ? "Executing"
//                       : "Completed"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <WorkflowSteps currentStep={workflowStep} />

//             {/* Dynamic Content */}
//             <div className="min-h-[400px]">{renderNotebookContent()}</div>
//           </div>
//         )}
//       </main>

//       {/* Full Screen Loading Overlay */}
//       {loading && (
//         <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="flex flex-col items-center space-y-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:0ms]"></div>
//               <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:150ms]"></div>
//               <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:300ms]"></div>
//             </div>
//             <p className="text-gray-700 font-medium">Loading...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AtlasApp;
import React, { useState, useEffect } from "react";
import api from "../../api/mockApi.js";

import Button from "../common/Button.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import WorkflowSteps from "../workflow/WorkflowSteps.jsx";
import PlanConfirmation from "../workflow/PlanConfirmation.jsx";
import PlanModification from "../workflow/PlanModification.jsx";
import OutputRenderer from "../outputs/OutputRenderer.jsx";
import ChatBox from "../chat/ChatBox.jsx";
import NotebooksList from "../notebooks/NotebooksList.jsx";

function AtlasApp() {
  const [currentView, setCurrentView] = useState("home");
  const [notebooks, setNotebooks] = useState([]);
  const [currentNotebook, setCurrentNotebook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [isModifying, setIsModifying] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);

  const managerId = "manager-123";

  useEffect(() => {
    loadNotebooks();
  }, []);

  const loadNotebooks = async () => {
    try {
      const data = await api.getNotebooks(managerId);
      setNotebooks(data.notebooks);
    } catch (error) {
      console.error("Failed to load notebooks:", error);
    }
  };

  const handleQuerySubmit = async (query) => {
    setLoading(true);

    // Check if this query already exists (case-insensitive, trimmed)
    const existingNotebook = notebooks.find(
      (nb) => nb.query.toLowerCase().trim() === query.toLowerCase().trim()
    );

    if (existingNotebook) {
      // Open existing notebook instead of creating new one
      console.log("Found existing notebook:", existingNotebook.notebookId);
      await handleNotebookSelect(existingNotebook.notebookId);
      setLoading(false);
      return;
    }

    // If no existing notebook found, create a new one
    setWorkflowStep(1);
    setExecutionProgress(0);
    setIsModifying(false);

    try {
      const notebook = await api.submitQuery(query, managerId);
      setCurrentNotebook(notebook);
      setCurrentView("notebook");
      setWorkflowStep(1); // Plan generated, waiting for confirmation
    } catch (error) {
      console.error("Failed to submit query:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanConfirm = async () => {
    if (!currentNotebook) return;

    // Don't set global loading - use local workflow state instead
    setWorkflowStep(2); // Executing
    setExecutionProgress(0);

    try {
      // First, confirm the plan (this returns "executing" status)
      const executingNotebook = await api.confirmPlan(
        currentNotebook.notebookId,
        managerId
      );

      // Update notebook status to executing
      setCurrentNotebook((prev) => ({
        ...prev,
        status: "executing",
      }));

      // Simulate execution progress
      const progressInterval = setInterval(() => {
        setExecutionProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Wait for the progress to complete, then get final results
      setTimeout(async () => {
        try {
          const completedNotebook = await api.getNotebook(
            currentNotebook.notebookId
          );
          setCurrentNotebook(completedNotebook);
          setWorkflowStep(3); // Completed
          setExecutionProgress(100);
          loadNotebooks(); // refresh list
        } catch (error) {
          console.error("Failed to get completed notebook:", error);
        }
      }, 2000); // Wait 2 seconds for progress animation
    } catch (error) {
      console.error("Failed to execute plan:", error);
    }
  };

  const handlePlanModify = () => {
    setIsModifying(true);
  };

  const handlePlanSave = async (modifiedPlan) => {
    setLoading(true);
    try {
      // Update the current notebook with modified plan
      setCurrentNotebook((prev) => ({
        ...prev,
        plan: modifiedPlan,
      }));
      setIsModifying(false);
    } catch (error) {
      console.error("Failed to save plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanCancel = () => {
    setIsModifying(false);
  };

  const handleNotebookSelect = async (notebookId) => {
    setLoading(true);
    setIsModifying(false);

    try {
      const notebook = await api.getNotebook(notebookId);
      setCurrentNotebook(notebook);
      setCurrentView("notebook");
      setWorkflowStep(3); // Completed notebook
      setExecutionProgress(100);
    } catch (error) {
      console.error("Failed to load notebook:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setCurrentNotebook(null);
    setWorkflowStep(0);
    setIsModifying(false);
    setExecutionProgress(0);
  };

  const renderNotebookContent = () => {
    if (loading && workflowStep === 1) {
      return (
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Generating execution plan...</p>
        </div>
      );
    }

    if (isModifying) {
      return (
        <PlanModification
          plan={currentNotebook.plan}
          onSave={handlePlanSave}
          onCancel={handlePlanCancel}
          loading={loading}
        />
      );
    }

    if (currentNotebook.status === "plan_generated" && !loading) {
      return (
        <PlanConfirmation
          plan={currentNotebook.plan}
          onConfirm={handlePlanConfirm}
          onModify={handlePlanModify}
          onCancel={handleBackToHome}
          loading={loading}
        />
      );
    }

    if (
      currentNotebook.status === "executing" ||
      (loading && workflowStep === 2)
    ) {
      return (
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-2">Executing plan...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${executionProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {executionProgress}% complete
            </p>
          </div>
        </div>
      );
    }

    if (currentNotebook.status === "completed" && currentNotebook.output) {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-green-800 font-medium">
                Analysis completed successfully!
              </p>
            </div>
          </div>
          <OutputRenderer outputs={currentNotebook.output} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Atlas</h1>
              <span className="text-gray-500">by Mercer Labs</span>
            </div>
            {currentView === "notebook" && (
              <Button variant="ghost" onClick={handleBackToHome}>
                ← Back to Home
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "home" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Automate Your Day-to-Day Tasks
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transform natural language queries into actionable insights
                using integrated data from Slack, Jira, and Google Drive.
              </p>
            </div>

            <div className="flex gap-8">
              <div className="w-1/2">
                <ChatBox onSubmit={handleQuerySubmit} loading={loading} />
              </div>
              <div className="w-1/2">
                <NotebooksList
                  notebooks={notebooks}
                  onSelect={handleNotebookSelect}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}

        {currentView === "notebook" && currentNotebook && (
          <div className="space-y-8">
            {/* Notebook Header */}
            <div className="bg-white p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">
                {currentNotebook.query}
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Notebook ID: {currentNotebook.notebookId}
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      currentNotebook.status === "completed"
                        ? "bg-green-400"
                        : currentNotebook.status === "executing"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                  ></div>
                  <span className="text-sm font-medium capitalize">
                    {currentNotebook.status === "plan_generated"
                      ? "Plan Ready"
                      : currentNotebook.status === "executing"
                      ? "Executing"
                      : "Completed"}
                  </span>
                </div>
              </div>
            </div>

            <WorkflowSteps currentStep={workflowStep} />

            {/* Dynamic Content */}
            <div className="min-h-[400px]">{renderNotebookContent()}</div>
          </div>
        )}
      </main>

      {/* Full Screen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:0ms]"></div>
              <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:150ms]"></div>
              <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:300ms]"></div>
            </div>
            <p className="text-gray-700 font-medium">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AtlasApp;
