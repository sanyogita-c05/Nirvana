import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination() {
  return (
    <div className="pagination">

      <button className="page-btn">
        <ChevronLeft size={18} />
      </button>

      <button className="page-number active-page">
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
      </button>

      <button className="page-btn">
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;