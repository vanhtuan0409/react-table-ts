import namor from "namor";

export const columns: Array<object> = [
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
    accessor: "info"
  }
];

export const makeData = (len: number): Array<object> => {
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
