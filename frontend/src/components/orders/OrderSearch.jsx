import {
  Search,
  CalendarDays,
  ArrowUpDown,
  SlidersHorizontal,
  Plus,
} from "lucide-react";


const SORT_LABELS = {
  "date-desc": "Newest First",
  "date-asc": "Oldest First",
  "amount-desc": "Highest Amount",
  "amount-asc": "Lowest Amount",
};

const SORT_CYCLE = ["date-desc", "date-asc", "amount-desc", "amount-asc"];


function OrderSearch({ onNewOrder,
  searchTerm,
  onSearchChange,
  todayOnly,
  onToggleToday,
  sortBy,
  onCycleSort, }) {

  const handleSortClick = () => {
    const currentIndex = SORT_CYCLE.indexOf(sortBy);
    onCycleSort(SORT_CYCLE[(currentIndex + 1) % SORT_CYCLE.length]);
  };


  return (
    <section className="order-search-section">

      <div className="search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search orders, customers, products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

      </div>

      <div className="search-actions">

        {/* <button className="action-btn">
          <CalendarDays size={18} />
          Today
        </button> */}
        <button className={`action-btn ${todayOnly ? "active-filter" : ""}`} onClick={onToggleToday}>
          <CalendarDays size={18} />
          {todayOnly ? "All Dates" : "Today"}
        </button>

        {/* <button className="action-btn">
          <ArrowUpDown size={18} />
          Sort
        </button> */}
        <button className="action-btn" onClick={handleSortClick}>
          <ArrowUpDown size={18} />
          {SORT_LABELS[sortBy]}
        </button>

        {/* 
        <button className="action-btn">
          <SlidersHorizontal size={18} />
          Filters
        </button> */}

        {/* <button className="new-order-btn" onClick={onNewOrder}>
          <Plus size={18} />
          New Order
        </button> */}

        <button className="new-order-btn" onClick={onNewOrder}>
          <Plus size={18} />
          New Order
        </button>



      </div>

    </section>
  );
}

export default OrderSearch;