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
            <th {...column.getHeaderProps()}>
              {column.render("Header")}
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
