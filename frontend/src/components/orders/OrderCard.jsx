import { Eye, Pencil, Trash2 } from "lucide-react";
import { deleteOrder } from "../../api/orderApi";

function OrderCard({ order, refreshOrders }) {
  const productNames = order.items.map((i) => i.name).join(", ");
  const date = new Date(order.orderDate).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

  const handleDelete = async () => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await deleteOrder(order._id);
      refreshOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete order");
    }
  };

  return (
    <div className="order-card">

      <div className="order-card-header">
        <div>
          <h3>{order.orderNumber}</h3>
          <p>{date}</p>
        </div>
        <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="order-card-body">
        <div className="customer-info">
          <div className="customer-avatar">{order.customer.name[0]}</div>
          <div>
            <h4>{order.customer.name}</h4>
            <p>{productNames}</p>
          </div>
        </div>
      </div>

      <div className="order-card-footer">
        <div>
          <span className="card-label">Amount</span>
          <h4>₹{order.totalAmount.toLocaleString("en-IN")}</h4>
        </div>
        <div>
          <span className="card-label">Payment</span>
          <span className={`payment-badge ${
            order.payment.status === "Fully Settled" ? "paid" : "pending"
          }`}>
            {order.payment.status}
          </span>
        </div>
      </div>

      <div className="mobile-actions">
        <button><Eye size={18} /></button>
        <button><Pencil size={18} /></button>
        <button className="delete-btn" onClick={handleDelete}>
          <Trash2 size={18} />
        </button>
      </div>

    </div>
  );
}

export default OrderCard;