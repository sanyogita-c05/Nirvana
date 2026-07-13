import OrderRow from "./OrderRow";

const orders = [
  // ...unchanged
];

function OrderTable() {
  return (
    <section className="orders-table-container">

      <table className="orders-table">

        <colgroup>
          <col style={{ width: "130px" }} />   {/* Order ID */}
          <col style={{ width: "220px" }} />   {/* Customer */}
          <col style={{ width: "180px" }} />   {/* Product */}
          <col style={{ width: "120px" }} />   {/* Date */}
          <col style={{ width: "110px" }} />   {/* Amount */}
          <col style={{ width: "110px" }} />   {/* Payment */}
          <col style={{ width: "110px" }} />   {/* Status */}
          <col style={{ width: "130px" }} />   {/* Actions */}
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