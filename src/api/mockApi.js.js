// // Mock API service
// const api = {
//   async submitQuery(query, managerId) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return {
//       notebookId: `notebook-${Date.now()}-${managerId}`,
//       query,
//       plan: [
//         "Integrate with Jira to find all open tasks assigned to manager's teams.",
//         "Filter tasks for 'follow-up' keywords.",
//         "Cross-reference with Slack conversations for recent updates.",
//         "Generate a list of pending tasks with relevant links.",
//       ],
//       status: "plan_generated",
//     };
//   },

//   async confirmPlan(notebookId, managerId) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return {
//       notebookId,
//       status: "executing",
//     };
//   },

//   async getNotebook(notebookId) {
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     // Extract query from notebookId or use a default
//     const queryFromId = notebookId.includes("notebook-")
//       ? "Find my pending open follow ups"
//       : "Find my pending open follow ups";

//     return {
//       notebookId,
//       query: queryFromId,
//       status: "completed",
//       plan: [
//         "Integrate with Jira to find all open tasks assigned to manager's teams.",
//         "Filter tasks for 'follow-up' keywords.",
//         "Cross-reference with Slack conversations for recent updates.",
//         "Generate a list of pending tasks with relevant links.",
//       ],
//       output: [
//         {
//           type: "list",
//           title: "Pending Follow-ups",
//           items: [
//             {
//               id: "jira-task-123",
//               description: "Review Q3 performance report",
//               status: "Open",
//               domain: "Performance",
//             },
//             {
//               id: "slack-thread-456",
//               description: "Customer contact follow-up for new feature",
//               status: "Open",
//               domain: "Customer Contact",
//             },
//             {
//               id: "gdrive-doc-789",
//               description: "Sales lead qualification follow-up",
//               status: "Open",
//               domain: "Sales",
//             },
//           ],
//         },
//         {
//           type: "table",
//           title: "Team Task Overview",
//           headers: ["Team", "Open Tasks", "Completed Tasks"],
//           rows: [
//             ["Team Alpha", 15, 45],
//             ["Team Beta", 10, 50],
//             ["Team Gamma", 20, 30],
//           ],
//         },
//         {
//           type: "graph",
//           graphType: "bar",
//           title: "Task Completion Rate by Domain",
//           labels: [
//             "Performance",
//             "Development",
//             "Operations",
//             "Customer Contact",
//             "Sales",
//           ],
//           data: [70, 85, 60, 90, 75],
//         },
//         {
//           type: "text",
//           content:
//             "This analysis provides a comprehensive overview of your pending follow-ups and team task statuses, enabling you to prioritize critical items and ensure smooth operations.",
//         },
//       ],
//     };
//   },

//   async getNotebooks(managerId) {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return {
//       notebooks: [
//         {
//           notebookId: "notebook-1",
//           query: "Find my pending open follow ups",
//           createdAt: "2025-09-27",
//         },
//         {
//           notebookId: "notebook-2",
//           query: "Weekly sales performance summary",
//           createdAt: "2025-09-26",
//         },
//         {
//           notebookId: "notebook-3",
//           query: "Development team sprint progress",
//           createdAt: "2025-09-25",
//         },
//       ],
//     };
//   },
// };

// export default api;
// Static Mock API service - matches document specifications exactly
const api = {
  // Store notebooks in memory to maintain state
  notebooks: new Map(),

  async submitQuery(query, managerId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const notebookId = `notebook-${Date.now()}-${managerId}`;
    const plan = this.generatePlan(query);

    const notebook = {
      notebookId,
      query,
      plan,
      status: "plan_generated",
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Store the notebook
    this.notebooks.set(notebookId, notebook);

    return notebook;
  },

  async confirmPlan(notebookId, managerId) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update notebook status
    const notebook = this.notebooks.get(notebookId);
    if (notebook) {
      notebook.status = "executing";
      this.notebooks.set(notebookId, notebook);
    }

    return {
      notebookId,
      status: "executing",
    };
  },

  async getNotebook(notebookId) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const notebook = this.notebooks.get(notebookId);

    // Handle both user-created and default notebooks
    if (notebook) {
      // User-created notebook
      const output = this.getStaticOutput();
      return {
        ...notebook,
        status: "completed",
        output,
      };
    } else {
      // Default notebook - handle static IDs
      let query = "";
      switch (notebookId) {
        case "notebook-1":
          query = "Find my pending open follow ups";
          break;
        case "notebook-2":
          query = "Weekly sales performance summary";
          break;
        case "notebook-3":
          query = "Development team sprint progress";
          break;
        default:
          throw new Error(`Notebook ${notebookId} not found`);
      }

      return {
        notebookId,
        query,
        status: "completed",
        plan: this.generatePlan(query),
        output: this.getStaticOutput(),
        createdAt: "2025-09-27",
      };
    }
  },

  async getNotebooks(managerId) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get user-created notebooks
    const userNotebooks = Array.from(this.notebooks.values())
      .filter((notebook) => notebook.notebookId.includes(managerId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Default mock notebooks as specified in document
    const defaultNotebooks = [
      {
        notebookId: "notebook-1",
        query: "Find my pending open follow ups",
        createdAt: "2025-09-27",
      },
      {
        notebookId: "notebook-2",
        query: "Weekly sales performance summary",
        createdAt: "2025-09-26",
      },
      {
        notebookId: "notebook-3",
        query: "Development team sprint progress",
        createdAt: "2025-09-25",
      },
    ];

    // Combine user notebooks with default notebooks, user notebooks first
    const allNotebooks = [
      ...userNotebooks.map((nb) => ({
        notebookId: nb.notebookId,
        query: nb.query,
        createdAt: nb.createdAt,
      })),
      ...defaultNotebooks,
    ];

    return {
      notebooks: allNotebooks,
    };
  },

  // Generate different plans based on query content
  generatePlan(query) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("follow") || lowerQuery.includes("pending")) {
      return [
        "Integrate with Jira to find all open tasks assigned to manager's teams.",
        "Filter tasks for 'follow-up' keywords.",
        "Cross-reference with Slack conversations for recent updates.",
        "Generate a list of pending tasks with relevant links.",
      ];
    } else if (lowerQuery.includes("sales") || lowerQuery.includes("revenue")) {
      return [
        "Connect to CRM system to fetch latest sales data.",
        "Analyze revenue trends and pipeline status.",
        "Cross-reference with team performance metrics.",
        "Generate comprehensive sales performance report.",
      ];
    } else if (
      lowerQuery.includes("team") ||
      lowerQuery.includes("performance")
    ) {
      return [
        "Access team management tools and databases.",
        "Collect individual and team performance metrics.",
        "Analyze productivity patterns and bottlenecks.",
        "Generate team performance insights and recommendations.",
      ];
    } else if (lowerQuery.includes("bug") || lowerQuery.includes("issue")) {
      return [
        "Connect to bug tracking systems (Jira, GitHub Issues).",
        "Filter critical and high-priority issues.",
        "Analyze bug trends and resolution times.",
        "Generate issue status report with recommendations.",
      ];
    } else if (
      lowerQuery.includes("meeting") ||
      lowerQuery.includes("schedule")
    ) {
      return [
        "Access calendar and scheduling systems.",
        "Identify upcoming meetings and conflicts.",
        "Cross-reference with project timelines.",
        "Generate optimized meeting schedule recommendations.",
      ];
    } else {
      return [
        "Analyze the query using natural language processing.",
        "Identify relevant data sources and integrations.",
        "Execute data collection from multiple systems.",
        "Generate comprehensive insights and recommendations.",
      ];
    }
  },

  // Return static mock data exactly as specified in the document
  getStaticOutput() {
    return [
      {
        type: "list",
        title: "Pending Follow-ups",
        items: [
          {
            id: "jira-task-123",
            description: "Review Q3 performance report",
            status: "Open",
            domain: "Performance",
          },
          {
            id: "slack-thread-456",
            description: "Customer contact follow-up for new feature",
            status: "Open",
            domain: "Customer Contact",
          },
          {
            id: "gdrive-doc-789",
            description: "Sales lead qualification follow-up",
            status: "Open",
            domain: "Sales",
          },
        ],
      },
      {
        type: "table",
        title: "Team Task Overview",
        headers: ["Team", "Open Tasks", "Completed Tasks"],
        rows: [
          ["Team Alpha", 15, 45],
          ["Team Beta", 10, 50],
          ["Team Gamma", 20, 30],
        ],
      },
      {
        type: "graph",
        graphType: "bar",
        title: "Task Completion Rate by Domain",
        labels: [
          "Performance",
          "Development",
          "Operations",
          "Customer Contact",
          "Sales",
        ],
        data: [70, 85, 60, 90, 75],
      },
      {
        type: "text",
        content:
          "This analysis provides a comprehensive overview of your pending follow-ups and team task statuses, enabling you to prioritize critical items and ensure smooth operations.",
      },
    ];
  },
};

export default api;
