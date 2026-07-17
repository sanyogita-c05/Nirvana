function RecentActivityCard() {
  const activity = [
    "Ceramic Vase stock updated",
    "New Crochet Bag added",
    "Soy Candle sold",
    "Macrame Wall Hanging edited",
    "Inventory synced",
  ];

  return (
    <div className="inventory-section-card">

      <div className="inventory-section-header">
        <h3>Recent Activity</h3>
      </div>

      <div className="activity-list">

        {activity.map((item, index) => (
          <div
            key={index}
            className="activity-item"
          >
            <div className="activity-dot" />

            <p>{item}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentActivityCard;