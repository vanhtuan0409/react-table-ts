import React from "react";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
const { useTable } = require("react-table");

interface Props {
  columns: Array<any>;
  data: Array<any>;
}

const Table: React.FunctionComponent<Props> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <TableHeaders groups={headerGroups} />
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return <TableRow data={row} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
