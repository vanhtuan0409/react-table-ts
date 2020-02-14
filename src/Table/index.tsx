import React from "react";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
const {
  useTable,
  useFilters,
  usePagination,
  useSortBy
} = require("react-table");

interface Props {
  columns: Array<any>;
  data: Array<any>;
  pageSize?: number;
}

const Table: React.FunctionComponent<Props> = ({ columns, data, pageSize }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex },
    previousPage,
    nextPage
  } = useTable(
    {
      initialState: {
        pageSize: pageSize
      },
      columns,
      data,
      autoResetFilters: true
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()}>
        <TableHeaders groups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, index: number) => {
            prepareRow(row);
            return <TableRow key={index} data={row} />;
          })}
        </tbody>
      </table>
      <hr />
      <Pagination
        onPreviousePage={previousPage}
        onNextPage={nextPage}
        selectedPage={pageIndex + 1}
        totalPage={pageOptions.length}
      />
    </>
  );
};

Table.defaultProps = {
  pageSize: 5
};

export default Table;
