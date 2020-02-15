import namor from "namor";
import TextFilter, { fuzzyFilterFn } from "./Table/filters/TextFilter";

export const columns: Array<any> = [
  {
    Header: "ID",
    accessor: "id",
    disableSortBy: true,
    disableFilters: true
  },
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true
  },
  {
    Header: "Info",
    Filter: TextFilter, // this will specify which component to render
    filter: fuzzyFilterFn, // this will specify which filter function you should use. You can select `fuzzy` filter or `prefix` filter
    accessor: "info"
  }
];

export interface PaginationData {
  data: Array<any>;
  currentPage: number;
  totalPage: number;
}

const makeData = (len: number): Array<any> => {
  const res: Array<any> = [];
  for (let i = 0; i < len; i++) {
    res.push({
      id: i + 1,
      name: namor.generate({ words: 1, numbers: 0 }),
      info: namor.generate({ words: 4, numbers: 0 })
    });
  }
  return res;
};

const _data = makeData(100);

export const loadData = (
  page: number,
  pageSize: number,
  filters: Array<any>,
  sortBy: Array<any>
): Promise<PaginationData> => {
  console.log(
    `Loading data for page ${page}, pageSize: ${pageSize}, filters: ${filters}, sortBy ${sortBy}`
  );
  // Filtering matching data
  const matches: Array<any> = [];
  _data.forEach(item => {
    let isMatched = true;
    for (let i = 0; i < filters.length; i++) {
      const { id, value } = filters[i];
      const itemValue = item[id];
      if (!itemValue.includes(value)) {
        isMatched = false;
        break;
      }
    }
    if (isMatched) {
      matches.push(item);
    }
  });

  const startOffset = page * pageSize;
  const endOffset = startOffset + pageSize;
  const totalPage = Math.ceil(matches.length / pageSize);
  const data = matches.slice(startOffset, endOffset);

  return Promise.resolve({
    data,
    totalPage,
    currentPage: page
  });
};

