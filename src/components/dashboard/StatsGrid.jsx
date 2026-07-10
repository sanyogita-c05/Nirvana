import StatCard from "./StatCard";

function StatsGrid() {
  const stats = [
    {
      icon: "₹",
      value: "₹1,86,240",
      label: "Total Revenue",
      subtext: "Since Jan 2026",
      growth: "43%",
      variant: "revenue",
    },
    {
      icon: "🧾",
      value: "483",
      label: "Total Orders",
      subtext: "102 this month",
      growth: "18%",
      variant: "orders",
    },
    {
      icon: "📦",
      value: "24",
      label: "Products",
      subtext: "6 categories",
      growth: "8%",
      variant: "products",
    },
    {
      icon: "👥",
      value: "218",
      label: "Customers",
      subtext: "12 new this week",
      growth: "12%",
      variant: "customers",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

export default StatsGrid;