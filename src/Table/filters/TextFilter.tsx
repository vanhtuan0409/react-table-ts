import React from "react";
const { default: matchSort } = require("match-sorter");

export const prefixFilterFn = (
  rows: Array<any>,
  id: string,
  filterValue: string
) => {
  return rows.filter(row => {
    const rowValue: string = row.values[id];
    if (!rowValue) {
      return true;
    }
    return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
  });
};

export const fuzzyFilterFn = (
  rows: Array<any>,
  id: string,
  filterValue: string
) => {
  return matchSort(rows, filterValue, { keys: [(row: any) => row.values[id]] });
};

interface Props {
  column: any;
}

const TextFilter: React.FunctionComponent<Props> = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ""}
      placeholder="Enter search text"
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
};

export default TextFilter;
