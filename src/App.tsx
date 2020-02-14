import React from "react";
import { columns, loadData } from "./data";
import Table from "./Table/index";
import "./App.css";

interface Props {
  title: string;
}

const App: React.FunctionComponent<Props> = ({ title }) => {
  const memoColumns = React.useMemo(() => columns, []);

  return (
    <div>
      <p>{title}</p>
      <Table columns={memoColumns} dataFn={loadData} />
    </div>
  );
};

export default App;
