import {
  Plus,
  Download,
} from "lucide-react";

function OrderHero({ onNewOrder, onExport, orders = [] }) {

  const today = new Date();
  const monthYear = today
    .toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    .toUpperCase();

  const todayStr = today.toDateString();
  const todaysOrders = orders.filter(
    (o) => new Date(o.orderDate).toDateString() === todayStr
  );

  const ordersToday = todaysOrders.length;
  const revenueToday = todaysOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === "Active").length;


  return (
    <section className="order-hero">

      <div className="order-hero-left">

        <p className="hero-tag">
          ORDERS • {monthYear}
        </p>

        <h1 className="hero-title">
          Order
          <br />
          Management
        </h1>

        <p className="hero-subtitle">
          Track, process and fulfill customer
          orders effortlessly.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn" onClick={onNewOrder}>
            <Plus size={18} />
            Create Order
          </button>

          <button className="secondary-btn" onClick={onExport}>
            <Download size={18} />
            Export Orders
          </button>

        </div>

      </div>

      <div className="hero-summary">

        <h4>TODAY AT A GLANCE</h4>

        <div className="summary-grid">

          <div className="summary-item">
            <h2>{ordersToday}</h2>
            <span>Orders</span>
          </div>

          <div className="summary-item">
            <h2>₹{revenueToday.toLocaleString("en-IN")}</h2>
            <span>Revenue</span>
          </div>

          <div className="summary-item">
            <h2>{pendingOrders}</h2>
            <span>Pending</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default OrderHero;