import React from 'react';
import './PaginationControls.css';

const PaginationControls = ({
  from,
  to,
  total,
  onPreviousClick,
  page,
  pages,
  onNextClick,
}) => (
  <div className="pagination-controls">
    <div className="pagination-controls__right">
      Showing {from} to {to} of {total} entries
    </div>
    <div className="pagination-controls__left">
      <button onClick={onPreviousClick} disabled={page <= 1}>
        Previous
      </button>
      {` page ${page} of ${pages} `}
      <button onClick={onNextClick} disabled={page >= pages}>
        Next
      </button>
    </div>
  </div>
);

export default PaginationControls;
