import React from "react";
// import your row style here

interface Props {
  data: any;
}

const TableRow: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <tr {...data.getRowProps()}>
      {data.cells.map((cell: any) => (
        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
      ))}
    </tr>
  );
};

export default TableRow;
