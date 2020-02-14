import React from "react";
// import your header style here

interface Props {
  groups: Array<any>;
}

const TableHeader: React.FunctionComponent<Props> = ({ groups }) => {
  return (
    <thead>
      {groups.map(group => (
        <tr {...group.getHeaderGroupProps()}>
          {group.headers.map((column: any) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}{" "}
              {column.isSorted ? (column.isSortedDesc ? "^" : "V") : ""}
              {column.canFilter && column["Filter"] && (
                <div>{column.render("Filter")}</div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
