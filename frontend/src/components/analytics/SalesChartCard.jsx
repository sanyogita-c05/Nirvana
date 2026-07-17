import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", orders: 220, revenue: 320 },
  { month: "Feb", orders: 180, revenue: 260 },
  { month: "Mar", orders: 260, revenue: 340 },
  { month: "Apr", orders: 300, revenue: 280 },
  { month: "May", orders: 240, revenue: 360 },
  { month: "Jun", orders: 320, revenue: 400 },
  { month: "Jul", orders: 280, revenue: 310 },
];

function SalesChartCard() {
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
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} barGap={6}>
            <CartesianGrid vertical={false} stroke="#f1ece8" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8a5b44", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8a5b44", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #f1ece8",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              }}
            />
            <Bar dataKey="revenue" fill="#ff7a3d" radius={[8, 8, 0, 0]} />
            <Bar dataKey="orders" fill="#b56cf0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default SalesChartCard;