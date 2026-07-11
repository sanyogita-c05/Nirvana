function InventoryStatCard({ item }) {
  return (
    <div className={`inventory-stat-card ${item.color}`}>
      <div className="inventory-stat-top">
        <div className="inventory-stat-icon">
          {item.icon}
        </div>

        <span className="inventory-stat-change">
          {item.change}
        </span>
      </div>

      <h2>{item.value}</h2>

      <p>{item.title}</p>
    </div>
  );
}

export default InventoryStatCard;