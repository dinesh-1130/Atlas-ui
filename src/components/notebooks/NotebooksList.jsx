import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";

const NotebooksList = ({ notebooks, onSelect, loading = false }) => {
  const [showAll, setShowAll] = useState(false);

  // Show first 3 notebooks initially
  const displayedNotebooks = showAll ? notebooks : notebooks.slice(0, 3);
  const hasMoreNotebooks = notebooks.length > 3;

  const handleNotebookClick = (notebookId) => {
    if (!loading) {
      onSelect(notebookId);
    }
  };

  return (
    <div className="relative">
      <Card className="p-6 h-full flex flex-col max-h-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Notebooks</h2>
          {notebooks.length > 0 && (
            <span className="text-sm text-gray-500">
              {showAll ? notebooks.length : Math.min(3, notebooks.length)} of{" "}
              {notebooks.length}
            </span>
          )}
        </div>

        {notebooks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 flex-1">
            <p>No notebooks yet.</p>
            <p className="text-sm mt-1">
              Create your first query to get started!
            </p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <div
              className={`space-y-3 ${
                showAll
                  ? "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  : ""
              }`}
              style={showAll ? { maxHeight: "240px" } : {}}
            >
              {displayedNotebooks.map((notebook) => (
                <div
                  key={notebook.notebookId}
                  className={`p-3 border border-gray-200 hover:border-black hover:shadow-sm transition-all duration-200 group flex-shrink-0 ${
                    loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
                  onClick={() => handleNotebookClick(notebook.notebookId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate group-hover:text-black">
                        {notebook.query}
                      </p>
                      <div className="flex items-center mt-1 space-x-3">
                        <p className="text-sm text-gray-600">
                          {notebook.createdAt}
                        </p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-gray-500 select-none">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`ml-3 transition-opacity ${
                        loading
                          ? "opacity-30"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreNotebooks && (
              <div className="mt-4 pt-3 border-t border-gray-200 flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => !loading && setShowAll(!showAll)}
                  className="w-full text-sm"
                  disabled={loading}
                >
                  {showAll ? (
                    <span className="flex items-center justify-center space-x-1">
                      <span>Show Less</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-1">
                      <span>View More ({notebooks.length - 3})</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotebooksList;
