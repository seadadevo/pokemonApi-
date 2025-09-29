const Pagination = ({ goToNextPage, goToPrevPage, prevPageUrl, goToFirstPage, goToLastPage }) => {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <button
        onClick={goToFirstPage}
        className="px-5 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition"
      >
        ⏮ First
      </button>

      <button
        onClick={goToPrevPage}
        disabled={!prevPageUrl}
        className="px-5 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ◀ Prev
      </button>

      <button
        onClick={goToNextPage}
        className="px-5 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition"
      >
        Next ▶
      </button>

      <button
        onClick={goToLastPage}
        className="px-5 py-2 rounded-lg font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:scale-105 transition"
      >
        Last ⏭
      </button>
    </div>
  );
};

export default Pagination;
