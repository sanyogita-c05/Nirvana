import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import api from "../../api/api";


const data = [
  { name: "Instagram", value: 45, color: "#ff7a3d" },
  { name: "Website", value: 30, color: "#b56cf0" },
  { name: "WhatsApp", value: 25, color: "#34a853" },
];

function TrafficSourceCard() {

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrafficSources = async () => {
      try {
        const res = await api.get("/dashboard/traffic-sources");
        setData(
          res.data.data.map((source, index) => ({
            name: source.name ?? source.source,
            value: source.value ?? source.percentage ?? 0,
            color: source.color || PALETTE[index % PALETTE.length],
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

  return (
    <div className="chart-card traffic-card">

      <div className="chart-card-header">
        <h3>Order Sources</h3>
      </div>

{/* 
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}

      {/* {!loading && !error && (
        <> */}
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
        {/* </> */}
      {/* )} */}
    </div>
  );
}

export default TrafficSourceCard;