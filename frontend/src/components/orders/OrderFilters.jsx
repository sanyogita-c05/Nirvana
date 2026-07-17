import { useState } from "react";

const filters = [
  {
    id: 1,
    label: "All Orders",
    count: 1248,
  },
  {
    id: 2,
    label: "Pending",
    count: 46,
  },
  {
    id: 3,
    label: "Processing",
    count: 82,
  },
  {
    id: 4,
    label: "Shipped",
    count: 173,
  },
  {
    id: 5,
    label: "Delivered",
    count: 912,
  },
  {
    id: 6,
    label: "Cancelled",
    count: 35,
  },
];

function OrderFilters() {
  const [active, setActive] = useState(1);

  return (
    <section className="order-filters">

      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-chip ${
            active === filter.id ? "active-filter" : ""
          }`}
          onClick={() => setActive(filter.id)}
        >
          <span>{filter.label}</span>

          <div className="filter-count">
            {filter.count}
          </div>
        </button>
      ))}

    </section>
  );
}

export default OrderFilters;