import React from "react";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import { PaginationData } from "../data";
const {
  useTable,
  useFilters,
  usePagination,
  useSortBy
} = require("react-table");

interface Props {
  columns: Array<any>;
  dataFn: (
    page: number,
    pageSize: number,
    filter: Array<any>,
    sortBy: Array<any>
  ) => Promise<PaginationData>;
  pageSize?: number;
}

const Table: React.FunctionComponent<Props> = ({
  columns,
  pageSize,
  dataFn
}) => {
  const [data, setData] = React.useState<Array<any>>([]);
  const [pageCount, setPageCount] = React.useState(0);

  const instance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: pageSize
      },
      manualSortBy: true,
      manualPagination: true,
      manualFilters: true, //turn it on if you wanna do server filtering
      pageCount,
      autoResetFilters: true
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex },
    previousPage,
    nextPage
  } = instance;

  React.useEffect(() => {
    (async () => {
      const loadedData = await dataFn(
        pageIndex,
        pageSize!,
        state.filters,
        state.sortBy
      );
      setData(loadedData.data);
      setPageCount(loadedData.totalPage);
    })();
  }, [pageIndex, pageSize, state.filters, state.sortBy, dataFn]);

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
