import {
  Plus,
  Download,
} from "lucide-react";

function OrderHero({ onNewOrder }) {
  return (
    <section className="order-hero">

      <div className="order-hero-left">

        <p className="hero-tag">
          ORDERS • JULY 2026
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

          <button className="secondary-btn">
            <Download size={18} />
            Export Orders
          </button>

        </div>

      </div>

      <div className="hero-summary">

        <h4>TODAY AT A GLANCE</h4>

        <div className="summary-grid">

          <div className="summary-item">
            <h2>34</h2>
            <span>Orders</span>
          </div>

          <div className="summary-item">
            <h2>₹2,967</h2>
            <span>Revenue</span>
          </div>

          <div className="summary-item">
            <h2>8</h2>
            <span>Pending</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default OrderHero;