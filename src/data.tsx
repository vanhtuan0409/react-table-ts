import namor from "namor";
import TextFilter from "./Table/filters/TextFilter";

export const columns: Array<any> = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Info",
    Filter: TextFilter, // this will specify which component to render
    filter: "fuzzy", // this will specify which filter function you should use. You can select `fuzzy` filter or `prefix` filter
    accessor: "info"
  }
];

export const makeData = (len: number): Array<any> => {
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push({
      id: i + 1,
      name: namor.generate({ words: 1, numbers: 0 }),
      info: namor.generate({ words: 4, numbers: 0 })
    });
  }
  return res;
};
