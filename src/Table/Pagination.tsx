import React from "react";

interface Props {
  onPreviousePage: () => void;
  onNextPage: () => void;
  selectedPage: number;
  totalPage: number;
}

const Pagination: React.FunctionComponent<Props> = ({
  onPreviousePage,
  onNextPage,
  selectedPage,
  totalPage
}) => {
  return (
    <div>
      <button onClick={onPreviousePage} disabled={selectedPage <= 1}>
        Previous Page
      </button>
      <div>
        {selectedPage} / {totalPage}
      </div>
      <button onClick={onNextPage} disabled={selectedPage >= totalPage}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
