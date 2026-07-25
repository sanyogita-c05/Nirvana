function RecentActivityCard({ products = [], orders = [] }) {
  const productEvents = products.map((p) => ({
    text:
      p.createdAt === p.updatedAt
        ? `${p.name} added to inventory`
        : `${p.name} stock/details updated`,
    timestamp: p.updatedAt,
  }));

  const orderEvents = orders.map((o) => ({
    text: `Order ${o.orderNumber} ${o.orderStatus.toLowerCase()}`,
    timestamp: o.updatedAt,
  }));

  const activity = [...productEvents, ...orderEvents]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 6);

  return (
    <div className="inventory-section-card">
      <div className="inventory-section-header">
        <h3>Recent Activity</h3>
      </div>

      <div className="activity-list">
        {activity.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          activity.map((item, index) => (
            <div key={index} className="activity-item">
              <div className="activity-dot" />
              <p>{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentActivityCard;