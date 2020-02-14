import React from "react";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import { prefixFilterFn, fuzzyFilterFn } from "./filters/TextFilter";
const { useTable, useFilters } = require("react-table");

interface Props {
  columns: Array<any>;
  data: Array<any>;
}

const Table: React.FunctionComponent<Props> = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      prefix: prefixFilterFn,
      fuzzy: fuzzyFilterFn
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      autoResetFilters: true
    },
    useFilters
  );

  return (
    <table {...getTableProps()}>
      <TableHeaders groups={headerGroups} />
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, index: number) => {
          prepareRow(row);
          return <TableRow key={index} data={row} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
