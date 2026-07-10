function SectionCard({ title, action, className = "", children }) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-card__header">
        <h3>{title}</h3>
        {action ? <button className="section-card__action">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}

export default SectionCard;