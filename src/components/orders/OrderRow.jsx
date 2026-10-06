import { Eye, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteOrder } from "../../api/orderApi";
import OrderDetailsDrawer from "./OrderDetailsDrawer";

function OrderRow({ order, refreshOrders, onEdit }) {
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
      toast.error(error.response?.data?.message || "Failed to delete order");
    }
  };

  return (
    <tr className="order-row">

      <td className="order-id">{order.orderNumber}</td>

      <td>
        <div className="customer-info">
          <div className="customer-avatar">{order.customer.name[0]}</div>
          <span>{order.customer.name}</span>
        </div>
      </td>

      <td>{productNames}</td>

      <td>{date}</td>

      <td className="order-amount">₹{order.totalAmount.toLocaleString("en-IN")}</td>

      <td>
        <span className={`payment-badge ${order.payment.status === "Fully Settled" ? "paid" : "pending"
          }`}>
          {order.payment.status}
        </span>
      </td>

      <td>
        <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
          {order.orderStatus}
        </span>
      </td>

      <td>
        <div className="row-actions">
          <OrderDetailsDrawer order={order} />
          <button onClick={() => onEdit(order)}>
            <Pencil size={18} />
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            <Trash2 size={18} />
          </button>
        </div>
      </td>

    </tr>
  );
}

export default OrderRow;