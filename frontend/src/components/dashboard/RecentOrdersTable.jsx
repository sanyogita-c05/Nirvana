import SectionCard from "./SectionCard";

function RecentOrdersTable() {
  const orders = [
    {
      order: "AS-1042",
      customer: "Priya Sharma",
      city: "Mumbai",
      items: "Hand-crocheted Boho Bag, Clay Lotus Diya Set",
      total: "₹1,230",
      status: "Delivered",
    },
    {
      order: "AS-1041",
      customer: "Kavya Nair",
      city: "Bangalore",
      items: "Kalamkari Embroidered Dupatta",
      total: "₹1,650",
      status: "Shipped",
    },
    {
      order: "AS-1040",
      customer: "Anita Mehta",
      city: "Delhi",
      items: "Lavender Soy Candle, Macramé Wall Hanging",
      total: "₹1,620",
      status: "Processing",
    },
    {
      order: "AS-1039",
      customer: "Deepa Krishnan",
      city: "Chennai",
      items: "Resin Floral Coaster Set",
      total: "₹650",
      status: "Pending",
    },
  ];

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