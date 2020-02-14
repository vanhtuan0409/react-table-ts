import React from "react";
import { columns, makeData } from "./data";
import Table from "./Table/index";
import "./App.css";

interface Props {
  title: string;
}

const App: React.FunctionComponent<Props> = ({ title }) => {
  const memoColumns = React.useMemo(() => columns, []);
  const data = React.useMemo(() => makeData(20), []);
  return (
    <div>
      <p>{title}</p>
      <Table columns={memoColumns} data={data} />
    </div>
  );
};

export default App;
