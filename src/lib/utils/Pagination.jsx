import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
}) => {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 justify-between w-full mt-4 px-4 pb-4">
      <div className="flex items-center gap-2">
        <div
          className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!canPrev}
        >
          Prev
        </div>
        <span className="mx-2">
          Page <b>{currentPage}</b> of <b>{totalPages}</b>
        </span>
        <div
          className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!canNext}
        >
          Next
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <select
          className="border rounded px-2 py-1"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
