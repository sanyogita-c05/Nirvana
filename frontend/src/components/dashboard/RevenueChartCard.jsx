import SectionCard from "./SectionCard";

function RevenueChartCard() {
  const points = [
    { month: "Jan", value: 18 },
    { month: "Feb", value: 22 },
    { month: "Mar", value: 20 },
    { month: "Apr", value: 29 },
    { month: "May", value: 31 },
    { month: "Jun", value: 27 },
    { month: "Jul", value: 39 },
  ];

  const max = Math.max(...points.map((p) => p.value));

  return (
    <SectionCard title="Revenue Overview" action="Jan–Jul 2026" className="revenue-card">
      <div className="revenue-chart">
        <div className="revenue-bars">
          {points.map((point) => (
            <div key={point.month} className="revenue-bar-item">
              <div className="revenue-bar-track">
                <div
                  className="revenue-bar-fill"
                  style={{ height: `${(point.value / max) * 100}%` }}
                />
              </div>
              <span className="revenue-bar-label">{point.month}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export default RevenueChartCard;