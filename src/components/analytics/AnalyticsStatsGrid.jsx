import { IndianRupee, ShoppingBag, Eye } from "lucide-react";

const stats = [
  {
    id: "revenue",
    label: "Weekly Revenue",
    value: "₹38,400",
    change: "Increased by 43%",
    icon: <IndianRupee size={20} />,
    gradientClass: "stat-gradient-pink",
  },
  {
    id: "orders",
    label: "Weekly Orders",
    value: "312",
    change: "Increased by 18%",
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

function AnalyticsStatsGrid() {
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