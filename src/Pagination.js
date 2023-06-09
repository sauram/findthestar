// Pagination.js
import React from 'react';

function Pagination({ currentPage, totalPages, handlePrevPage, handleNextPage }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
