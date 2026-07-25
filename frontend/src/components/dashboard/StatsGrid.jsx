import { useEffect, useState } from "react";
import api from "../../api/api";
import StatCard from "./StatCard";

function StatsGrid() {

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        const data = res.data.data;

        setStats([
          {
            icon: "₹",
            value: `₹${data.revenue.total.toLocaleString("en-IN")}`,
            label: "Total Revenue",
            subtext: data.revenue.sinceDate
              ? `Since ${new Date(data.revenue.sinceDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`
              : "No orders yet",
            growth: `${data.revenue.growth}%`,
            variant: "revenue",
          },
          {
            icon: "🧾",
            value: `${data.orders.total}`,
            label: "Total Orders",
            subtext: `${data.orders.thisMonth} this month`,
            growth: `${data.orders.growth}%`,
            variant: "orders",
          },
          {
            icon: "📦",
            value: `${data.products.total}`,
            label: "Products",
            subtext: `${data.products.categories} categories`,
            growth: `${data.products.growth}%`,
            variant: "products",
          },
          {
            icon: "👥",
            value: `${data.customers.total}`,
            label: "Customers",
            subtext: `${data.customers.newThisWeek} new this week`,
            growth: `${data.customers.growth}%`,
            variant: "customers",
          },
        ]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  if (loading) return <section className="stats-grid">Loading stats...</section>;
  if (error) return <section className="stats-grid">{error}</section>;


  // const stats = [
  //   {
  //     icon: "₹",
  //     value: "₹1,86,240",
  //     label: "Total Revenue",
  //     subtext: "Since Jan 2026",
  //     growth: "43%",
  //     variant: "revenue",
  //   },
  //   {
  //     icon: "🧾",
  //     value: "483",
  //     label: "Total Orders",
  //     subtext: "102 this month",
  //     growth: "18%",
  //     variant: "orders",
  //   },
  //   {
  //     icon: "📦",
  //     value: "24",
  //     label: "Products",
  //     subtext: "6 categories",
  //     growth: "8%",
  //     variant: "products",
  //   },
  //   {
  //     icon: "👥",
  //     value: "218",
  //     label: "Customers",
  //     subtext: "12 new this week",
  //     growth: "12%",
  //     variant: "customers",
  //   },
  // ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

export default StatsGrid;