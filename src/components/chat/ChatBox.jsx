import React, { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

const ChatBox = ({ onSubmit, loading = false }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim() && !loading) {
      onSubmit(query);
      setQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Ask Atlas</h2>
      <div className="space-y-4">
        <Input
          placeholder="Enter your query (e.g., 'Find my pending open follow ups')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={loading || !query.trim()}
        >
          {loading ? "Processing..." : "Submit Query"}
        </Button>
      </div>
    </Card>
  );
};

export default ChatBox;
