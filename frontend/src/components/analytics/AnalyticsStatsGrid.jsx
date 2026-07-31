import { useEffect, useState } from "react";
import { IndianRupee, ShoppingBag, Eye } from "lucide-react";
import api from "../../api/api";


function AnalyticsStatsGrid() {

  const [weekly, setWeekly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await api.get("/dashboard/weekly-stats");
        setWeekly(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeekly();
  }, []);

  const formatChange = (growth) =>
    `${growth >= 0 ? "Increased" : "Decreased"} by ${Math.abs(growth)}%`;


  const stats = [
    {
      id: "revenue",
      label: "Weekly Revenue",
      value: loading ? "..." : error ? "—" : `₹${weekly.revenue.total.toLocaleString("en-IN")}`,
      change: loading ? "" : error || formatChange(weekly.revenue.growth),
      icon: <IndianRupee size={20} />,
      gradientClass: "stat-gradient-pink",
    },
    {
      id: "orders",
      label: "Weekly Orders",
      value: loading ? "..." : error ? "—" : `${weekly.orders.total}`,
      change: loading ? "" : error || formatChange(weekly.orders.growth),
      icon: <ShoppingBag size={20} />,
      gradientClass: "stat-gradient-blue",
    },
    {
      id: "visitors",
      label: "Store Visitors",
      value: "5,741",
      change: "Increased by 27%",
      icon: <Eye size={20} />,
      gradientClass: "stat-gradient-green",
    },
  ];

  return (
    <div className="analytics-stats-grid">
      {stats.map((stat) => (
        <div className={`analytics-stat-card ${stat.gradientClass}`} key={stat.id}>

          <div className="analytics-stat-decor" />

          <div className="analytics-stat-top">
            <span className="analytics-stat-label">{stat.label}</span>
            <span className="analytics-stat-icon">{stat.icon}</span>
          </div>

          <h2 className="analytics-stat-value">{stat.value}</h2>
          <span className="analytics-stat-change">{stat.change}</span>

        </div>
      ))}
    </div>
  );
}

export default AnalyticsStatsGrid;