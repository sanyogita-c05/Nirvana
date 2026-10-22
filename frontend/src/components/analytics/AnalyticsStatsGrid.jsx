import { useEffect, useState } from "react";
import { IndianRupee, ShoppingBag, Package } from "lucide-react";
import api from "../../api/api";


function AnalyticsStatsGrid() {

  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setTotals(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  const formatChange = (growth) =>
    `${growth >= 0 ? "Increased" : "Decreased"} by ${Math.abs(growth)}% this month`;


  const stats = [
    {
      id: "revenue",
      label: "Total Revenue",
      value: loading ? "..." : error ? "—" : `₹${totals.revenue.total.toLocaleString("en-IN")}`,
      change: loading ? "" : error || formatChange(totals.revenue.growth),
      icon: <IndianRupee size={20} />,
      gradientClass: "stat-gradient-pink",
    },
    {
      id: "orders",
      label: "Total Orders",
      value: loading ? "..." : error ? "—" : `${totals.orders.total}`,
      change: loading ? "" : error || formatChange(totals.orders.growth),
      icon: <ShoppingBag size={20} />,
      gradientClass: "stat-gradient-blue",
    },
    {
      id: "products",
      label: "Total Products",
      value: loading ? "..." : error ? "—" : `${totals.products.total}`,
      change: loading ? "" : error || `${totals.products.categories} categories`,
      icon: <Package size={20} />,
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