import {
  Search,
  CalendarDays,
  ArrowUpDown,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

function OrderSearch({ onNewOrder }) {
  return (
    <section className="order-search-section">

      <div className="search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search orders, customers, products..."
        />

      </div>

      <div className="search-actions">

        <button className="action-btn">
          <CalendarDays size={18} />
          Today
        </button>

        <button className="action-btn">
          <ArrowUpDown size={18} />
          Sort
        </button>

        <button className="action-btn">
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <button className="new-order-btn" onClick={onNewOrder}>
          <Plus size={18} />
          New Order
        </button>

      </div>

    </section>
  );
}

export default OrderSearch;