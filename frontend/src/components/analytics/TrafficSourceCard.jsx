import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import api from "../../api/api";

const PALETTE = ["#ff7a3d", "#b56cf0", "#34a853", "#4a90d9", "#f2c94c"];

function TrafficSourceCard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrafficSources = async () => {
      try {
        const res = await api.get("/dashboard/traffic-sources");
        setData(
          res.data.data.map((entry, index) => ({
            name: entry.source,
            value: entry.value,
            color: PALETTE[index % PALETTE.length],
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load traffic sources.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrafficSources();
  }, []);

  // The biggest slice is shown in the middle of the ring.
  const top = data.length
    ? data.reduce((a, b) => (b.value > a.value ? b : a), data[0])
    : null;

  return (
    <div className="chart-card traffic-card">

      <div className="chart-card-header">
        <div>
          <h3>Order Sources</h3>
          <p className="chart-subtitle">Where your orders come from</p>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && data.length === 0 && <p>No order source data yet.</p>}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="donut-chart-wrap">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={96}
                  paddingAngle={data.length > 1 ? 4 : 0}
                  cornerRadius={8}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid #f1ece8",
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center">
              <strong>{top.value}%</strong>
              <span>{top.name}</span>
            </div>
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
        </>
      )}

    </div>
  );
}

export default TrafficSourceCard;