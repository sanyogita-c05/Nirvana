import {
  ShoppingBag,
  Clock3,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

function OrderStats({ orders = [] }) {
  const today = new Date().toDateString();

  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => o.orderStatus === "Active").length;
  const closedOrders = orders.filter((o) => o.orderStatus === "Closed").length;
  const revenueToday = orders
    .filter((o) => new Date(o.orderDate).toDateString() === today)
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingBag size={26} />,
      color: "orange",
    },
    {
      title: "Active Orders",
      value: activeOrders,
      icon: <Clock3 size={26} />,
      color: "yellow",
    },
    {
      title: "Closed Orders",
      value: closedOrders,
      icon: <CheckCircle2 size={26} />,
      color: "green",
    },
    {
      title: "Revenue Today",
      value: `₹${revenueToday.toLocaleString("en-IN")}`,
      icon: <IndianRupee size={26} />,
      color: "purple",
    },
  ];

  return (
    <section className="order-stats">
      {stats.map((item, index) => (
        <div className="order-stat-card" key={index}>
          <div className={`stat-icon ${item.color}`}>{item.icon}</div>
          <div className="stat-content">
            <p>{item.title}</p>
            <h2>{item.value}</h2>
          </div>
        </div>
      ))}
    </section>
  );
}

export default OrderStats;