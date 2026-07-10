function StatCard({ icon, value, label, subtext, growth, variant = "" }) {
  return (
    <article className={`stat-card ${variant}`}>
      <div className="stat-card__top">
        <div className="stat-card__icon">{icon}</div>
        <span className="stat-card__growth">↑ {growth}</span>
      </div>

      <h3 className="stat-card__value">{value}</h3>
      <p className="stat-card__label">{label}</p>
      <span className="stat-card__subtext">{subtext}</span>
    </article>
  );
}

export default StatCard;