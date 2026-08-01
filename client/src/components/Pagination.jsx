import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-book-gray/50 rounded-sm font-sans text-sm disabled:opacity-30 hover:bg-book-gray/10 transition-colors"
      >
        &larr; Prev
      </button>

      <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-sm font-sans text-sm transition-colors ${
                currentPage === page
                  ? "bg-book-teal text-white font-bold"
                  : "text-book-text hover:bg-book-gray/20"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-book-gray/50 rounded-sm font-sans text-sm disabled:opacity-30 hover:bg-book-gray/10 transition-colors"
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
