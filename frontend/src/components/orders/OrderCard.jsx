import { Eye, Pencil, Trash2 } from "lucide-react";

function OrderCard({ order }) {
  return (
    <div className="order-card">

      <div className="order-card-header">

        <div>
          <h3>{order.id}</h3>
          <p>{order.date}</p>
        </div>

        <span
          className={`status-badge ${order.status.toLowerCase()}`}
        >
          {order.status}
        </span>

      </div>

      <div className="order-card-body">

        <div className="customer-info">

          <div className="customer-avatar">
            {order.avatar}
          </div>

          <div>
            <h4>{order.customer}</h4>
            <p>{order.product}</p>
          </div>

        </div>

      </div>

      <div className="order-card-footer">

        <div>

          <span className="card-label">
            Amount
          </span>

          <h4>{order.amount}</h4>

        </div>

        <div>

          <span className="card-label">
            Payment
          </span>

          <span
            className={`payment-badge ${
              order.payment === "Paid"
                ? "paid"
                : "pending"
            }`}
          >
            {order.payment}
          </span>

        </div>

      </div>

      <div className="mobile-actions">

        <button>
          <Eye size={18} />
        </button>

        <button>
          <Pencil size={18} />
        </button>

        <button className="delete-btn">
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}

export default OrderCard;