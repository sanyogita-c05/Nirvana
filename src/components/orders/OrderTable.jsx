import OrderRow from "./OrderRow";

function OrderTable({ orders = [], loading, refreshOrders }) {
  return (
    <section className="orders-table-container">

      <table className="orders-table">

        <colgroup>
          <col style={{ width: "130px" }} />
          <col style={{ width: "220px" }} />
          <col style={{ width: "180px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "110px" }} />
          <col style={{ width: "110px" }} />
          <col style={{ width: "110px" }} />
          <col style={{ width: "130px" }} />
        </colgroup>

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>Loading orders...</td></tr>
          ) : orders.length === 0 ? (
            <tr><td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>No orders found</td></tr>
          ) : (
            orders.map((order) => (
              <OrderRow key={order._id} order={order} refreshOrders={refreshOrders} />
            ))
          )}
        </tbody>

      </table>

    </section>
  );
}

export default OrderTable;