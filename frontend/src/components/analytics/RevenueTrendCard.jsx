import { useMemo, useState } from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../../api/api";

function RevenueTrendCard() {
  const [period, setPeriod] = useState("monthly");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ------------------------------------------
  // Demo data (UI only, no backend)
  // ------------------------------------------

  // const weeklyData = [
  //   { label: "Mon", revenue: 4200 },
  //   { label: "Tue", revenue: 6800 },
  //   { label: "Wed", revenue: 5100 },
  //   { label: "Thu", revenue: 8900 },
  //   { label: "Fri", revenue: 7200 },
  //   { label: "Sat", revenue: 11200 },
  //   { label: "Sun", revenue: 9600 },
  // ];

  // const monthlyData = [
  //   { label: "Sep", revenue: 32000 },
  //   { label: "Oct", revenue: 41000 },
  //   { label: "Nov", revenue: 38500 },
  //   { label: "Dec", revenue: 52000 },
  //   { label: "Jan", revenue: 47500 },
  //   { label: "Feb", revenue: 61000 },
  //   { label: "Mar", revenue: 58000 },
  //   { label: "Apr", revenue: 72000 },
  //   { label: "May", revenue: 68500 },
  //   { label: "Jun", revenue: 81000 },
  //   { label: "Jul", revenue: 76000 },
  //   { label: "Aug", revenue: 92000 },
  // ];

  // const yearlyData = [
  //   { label: "2022", revenue: 380000 },
  //   { label: "2023", revenue: 520000 },
  //   { label: "2024", revenue: 680000 },
  //   { label: "2025", revenue: 910000 },
  //   { label: "2026", revenue: 1250000 },
  // ];

  // const chartData = useMemo(() => {
  //   if (period === "weekly") return weeklyData;
  //   if (period === "yearly") return yearlyData;
  //   return monthlyData;
  // }, [period]);

  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/dashboard/revenue-trend?period=${period}`);
        setChartData(
          res.data.data.map((point) => ({
            label: point.label ?? point.month ?? point.week ?? point.year,
            revenue: point.revenue ?? point.value ?? 0,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load revenue trend.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, [period]);

  return (
    <div className="revenue-trend-card">

      {/* Header */}
      <div className="revenue-trend-header">

        <div>
          <h3>Revenue Trend</h3>
          <p>Track revenue performance over time</p>
        </div>

        {/* Period Buttons */}
        <div className="revenue-period-buttons">

          <button
            className={period === "weekly" ? "active" : ""}
            onClick={() => setPeriod("weekly")}
          >
            Weekly
          </button>

          <button
            className={period === "monthly" ? "active" : ""}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>

          <button
            className={period === "yearly" ? "active" : ""}
            onClick={() => setPeriod("yearly")}
          >
            Yearly
          </button>

        </div>
      </div>

      {/* Chart */}
      <div className="chart-area">

        {loading && <p>Loading chart...</p>}
        {error && <p>{error}</p>}


        {!loading && !error && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >

              <CartesianGrid
                vertical={false}
                stroke="#f1ece8"
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#8a5b44",
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#8a5b44",
                  fontSize: 12,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Revenue",
                ]}
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #f1ece8",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ff7a3d"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default RevenueTrendCard;