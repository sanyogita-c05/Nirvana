import { Eye, Pencil, Trash2 } from "lucide-react";

function OrderRow({ order }) {
  return (
    <tr className="order-row">

      <td className="order-id">
        {order.id}
      </td>

      <td>

        <div className="customer-info">

          <div className="customer-avatar">
            {order.avatar}
          </div>

          <span>{order.customer}</span>

        </div>

      </td>

      <td>{order.product}</td>

      <td>{order.date}</td>

      <td className="order-amount">
        {order.amount}
      </td>

      <td>

        <span
          className={`payment-badge ${
            order.payment === "Paid"
              ? "paid"
              : "pending"
          }`}
        >
          {order.payment}
        </span>

      </td>

      <td>

        <span
          className={`status-badge ${
            order.status.toLowerCase()
          }`}
        >
          {order.status}
        </span>

      </td>

      <td>

        <div className="row-actions">

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

      </td>

    </tr>
  );
}

export default OrderRow;