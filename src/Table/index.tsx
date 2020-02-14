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
  dataFn: (page: number, pageSize: number) => Promise<PaginationData>;
  pageSize?: number;
}

const Table: React.FunctionComponent<Props> = ({
  columns,
  pageSize,
  dataFn
}) => {
  const [data, setData] = React.useState<Array<any>>([]);
  const [pageCount, setPageCount] = React.useState(0);

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
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: pageSize
      },
      manualPagination: true,
      pageCount,
      autoResetFilters: true
    },
    useFilters,
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    (async () => {
      const loadedData = await dataFn(pageIndex, pageSize!);
      setData(loadedData.data);
      setPageCount(loadedData.totalPage);
    })();
  }, [pageIndex, pageSize, dataFn]);

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
