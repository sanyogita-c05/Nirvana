import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import SectionCard from "./SectionCard";

function RecentOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/recent");
        setOrders(
          res.data.data.map((order) => ({
            order: order.orderNumber,
            customer: order.customer.name,
            city: order.customer.city || "—",
            items: order.items.map((i) => i.name).join(", "),
            total: `₹${order.totalAmount.toLocaleString("en-IN")}`,
            status: order.orderStatus,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load recent orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <SectionCard title="Recent Orders" action="View all" onAction={() => navigate("/orders")}>
        <p>Loading...</p>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Recent Orders" action="View all">
        <p>{error}</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Recent Orders" action="View all">
      <div className="dash-orders-table-wrap">
        <table className="dash-orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((row) => (
              <tr key={row.order}>
                <td>{row.order}</td>
                <td>
                  <div className="dash-customer-cell">
                    <strong>{row.customer}</strong>
                    <span>{row.city}</span>
                  </div>
                </td>
                <td className="dash-orders-table__items">{row.items}</td>
                <td className="dash-orders-table__total">{row.total}</td>
                <td>
                  <span
                    className={`dash-status-pill ${row.status.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

export default RecentOrdersTable;