import React, { Fragment } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Page navigation functions
  const goToPage = (pageNumber) => onPageChange(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && onPageChange(currentPage + 1);
  const prevPage = () => currentPage > 1 && onPageChange(currentPage - 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-50"
        }`}
      >
        &laquo; Trước
      </button>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (num) =>
              num === 1 ||
              num === totalPages ||
              (num >= currentPage - 1 && num <= currentPage + 1)
          )
          .map((number, idx, array) => (
            <Fragment key={number}>
              {idx > 0 && array[idx - 1] !== number - 1 && (
                <span className="px-3 py-1">...</span>
              )}
              <button
                onClick={() => goToPage(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }`}
              >
                {number}
              </button>
            </Fragment>
          ))}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-50"
        }`}
      >
        Sau &raquo;
      </button>
    </div>
  );
}

export default Pagination;
