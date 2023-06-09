// PageNumber.js
import React from 'react';

function PageNumber({ currentPage, totalPages }) {
  return (
    <div className="flex justify-center mt-4">
      <p className="text-gray-500 text-sm">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default PageNumber;
