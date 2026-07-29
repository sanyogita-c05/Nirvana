import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">

      <button className="page-btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft size={18} />
      </button>

      {/* <button className="page-number active-page">
        1
      </button>

      <button className="page-number">
        2
      </button>

      <button className="page-number">
        3
      </button>

      <button className="page-number">
        4
      </button> */}

      {pages.map((page) => (
        <button
          key={page}
          className={`page-number ${currentPage === page ? "active-page" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* <button className="page-btn">
        <ChevronRight size={18} />
      </button> */}

      <button className="page-btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;