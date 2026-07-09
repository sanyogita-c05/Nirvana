function StatsSection() {
  const stats = [
    { value: "12,000+", label: "Artisan Sellers" },
    { value: "₹4.2 Cr+", label: "Orders Managed" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "8 min", label: "Average Setup Time" },
  ];

  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;