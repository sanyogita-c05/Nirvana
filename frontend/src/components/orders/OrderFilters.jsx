// import { useState } from "react";

function OrderFilters({ orders = [], active, onFilterChange }) {
  // const [active, setActive] = useState("All");

  const filters = [
    { label: "All Orders", key: "All", count: orders.length },
    { label: "Active", key: "Active", count: orders.filter((o) => o.orderStatus === "Active").length },
    { label: "Shipped", key: "Shipped", count: orders.filter((o) => o.orderStatus === "Shipped").length },
    { label: "Closed", key: "Closed", count: orders.filter((o) => o.orderStatus === "Closed").length },
  ];

  return (
    <section className="order-filters">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={`filter-chip ${active === filter.key ? "active-filter" : ""}`}
          onClick={() => onFilterChange(filter.key)}
        >
          <span>{filter.label}</span>
          <div className="filter-count">{filter.count}</div>
        </button>
      ))}
    </section>
  );
}

export default OrderFilters;