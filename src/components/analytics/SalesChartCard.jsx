import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/api";

function SalesChartCard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await api.get("/dashboard/revenue-chart");
        setData(
          res.data.data.map((point) => ({
            month: point.month,
            revenue: point.value,
            orders: point.orders,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);


  return (
    <div className="chart-card">

      <div className="chart-card-header">
        <h3>Orders &amp; Revenue Statistics</h3>

        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot dot-orange" />
            Revenue
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-purple" />
            Orders
          </span>
        </div>
      </div>

      <div className="chart-area">
        {loading && <p>Loading chart...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barGap={6}>
              <CartesianGrid vertical={false} stroke="#f1ece8" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#8a5b44", fontSize: 12 }} />


              <YAxis
                yAxisId="revenue"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#ff7a3d", fontSize: 12 }}
              />

              <YAxis
                yAxisId="orders"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#b56cf0", fontSize: 12 }}
                allowDecimals={false}
              />


              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #f1ece8",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Bar yAxisId="revenue" dataKey="revenue" fill="#ff7a3d" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="orders" dataKey="orders" fill="#b56cf0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}

export default SalesChartCard;