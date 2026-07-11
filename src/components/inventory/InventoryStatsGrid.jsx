import InventoryStatCard from "./InventoryStatCard";

function InventoryStatsGrid({ products }) {
  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  const lowStock = products.filter(
    (product) =>
      product.stockQuantity > 0 &&
      product.stockQuantity <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => product.stockQuantity === 0
  ).length;

  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: totalProducts,
      change: "",
      color: "products",
      icon: "📦",
    },
    {
      id: 2,
      title: "Categories",
      value: totalCategories,
      change: "",
      color: "categories",
      icon: "🗂️",
    },
    {
      id: 3,
      title: "Low Stock",
      value: lowStock,
      change: "",
      color: "warning",
      icon: "⚠️",
    },
    {
      id: 4,
      title: "Out of Stock",
      value: outOfStock,
      change: "",
      color: "danger",
      icon: "❌",
    },
  ];

  return (
    <section className="inventory-stats-grid">
      {stats.map((item) => (
        <InventoryStatCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  );
}

export default InventoryStatsGrid;