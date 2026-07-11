function StatsSection() {
  const stats = ["Ignite", "Momentum", "Elevate", "Thrive"];

  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <h3 className="animated-stat-title">{item}</h3>
          </div>
        ))}
      </div>

      <style>
        {`
          .animated-stat-title {
            margin: 0;
            font-size: clamp(1.6rem, 2vw, 2.2rem);
            font-weight: 700;
            letter-spacing: 0.02em;
            background: linear-gradient(
              90deg,
              #f6c453,
              #ff8a65,
              #d8b4fe,
              #f6c453
            );
            background-size: 220% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: statShimmer 5s linear infinite;
            text-shadow:
              0 0 10px rgba(246, 196, 83, 0.35),
              0 0 20px rgba(216, 180, 254, 0.25),
              0 0 30px rgba(255, 138, 101, 0.18);
          }

          @keyframes statShimmer {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 220% center;
            }
          }
        `}
      </style>
    </section>
  );
}

export default StatsSection;