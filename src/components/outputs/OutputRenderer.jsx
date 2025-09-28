import React from "react";
import Card from "../common/Card";
import ListOutput from "./ListOutput";
import TableOutput from "./TableOutput";
import GraphOutput from "./GraphOutput";
import TextOutput from "./TextOutput";

const OutputRenderer = ({ outputs }) => (
  <div className="space-y-8">
    {outputs.map((output, index) => (
      <Card key={index} className="p-6">
        {output.type === "list" && <ListOutput data={output} />}
        {output.type === "table" && <TableOutput data={output} />}
        {output.type === "graph" && <GraphOutput data={output} />}
        {output.type === "text" && <TextOutput data={output} />}
      </Card>
    ))}
  </div>
);

export default OutputRenderer;
