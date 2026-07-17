import OrderRow from "./OrderRow";

const orders = [
  // ...unchanged
];

function OrderTable() {
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
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>

      </table>

    </section>
  );
}

export default OrderTable;