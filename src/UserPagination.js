import React from 'react';

function UserPagination({ canPreviousPage, canNextPage, gotoPage, nextPage, previousPage, pageIndex, pageCount, pageSize, setPageSize }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={`px-2 py-1 rounded ${
            canPreviousPage ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {'<<'}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-2 py-1 rounded ${
            canPreviousPage ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {'<'}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-2 py-1 rounded ${
            canNextPage ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {'>'}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className={`px-2 py-1 rounded ${
            canNextPage ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {'>>'}
        </button>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </span>
        <span>
          Go to page:{' '}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="px-2 py-1 w-16 border rounded border-gray-300"
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-2 py-1 border rounded border-gray-300 ml-2"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserPagination;
