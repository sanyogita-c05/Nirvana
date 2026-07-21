import OrderCard from "./OrderCard";

function MobileOrderList({ orders = [], refreshOrders, onEdit }) {
  return (
    <section className="mobile-order-list">
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", padding: "40px" }}>No orders found</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id} order={order} refreshOrders={refreshOrders} onEdit={onEdit} />
        ))
      )}
    </section>
  );
}

export default MobileOrderList;