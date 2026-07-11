import SectionCard from "./SectionCard";

function LowStockCard() {
  const items = [
    { name: "Lavender Soy Candle", left: "3 left", status: "Low Stock" },
    { name: "Resin Floral Coaster Set", left: "0 left", status: "Out of Stock" },
    { name: "Macramé Wall Hanging", left: "5 left", status: "Low Stock" },
  ];

  return (
    <SectionCard title="Low Stock Alerts" className="low-stock-card">
      <div className="low-stock-list">
        {items.map((item) => (
          <div key={item.name} className="low-stock-item">
            <div className="low-stock-item__avatar">{item.name.charAt(0)}</div>

            <div className="low-stock-item__info">
              <p>{item.name}</p>
              <span>{item.left}</span>
            </div>

            <span
              className={`stock-badge ${
                item.status === "Out of Stock" ? "danger" : "warning"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <button className="manage-link">Manage inventory →</button>
    </SectionCard>
  );
}

export default LowStockCard;