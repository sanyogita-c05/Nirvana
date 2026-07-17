import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Instagram", value: 45, color: "#ff7a3d" },
  { name: "Website", value: 30, color: "#b56cf0" },
  { name: "WhatsApp", value: 25, color: "#34a853" },
];

function TrafficSourceCard() {
  return (
    <div className="chart-card traffic-card">

      <div className="chart-card-header">
        <h3>Order Sources</h3>
      </div>

      <div className="donut-chart-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="donut-legend">
        {data.map((entry) => (
          <div className="donut-legend-item" key={entry.name}>
            <span
              className="legend-dot"
              style={{ background: entry.color }}
            />
            <span className="donut-legend-label">{entry.name}</span>
            <span className="donut-legend-value">{entry.value}%</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TrafficSourceCard;