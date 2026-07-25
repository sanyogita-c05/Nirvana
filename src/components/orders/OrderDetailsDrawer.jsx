import { useState } from "react";
import {
  Eye,
  X,
  User,
  Package,
  CreditCard,
  Truck,
  MapPin,
} from "lucide-react";

function OrderDetailsDrawer({ order }) {
  const [open, setOpen] = useState(false);

  // const date = new Date(order.orderDate).toLocaleDateString("en-IN", {
  //   day: "2-digit", month: "short", year: "numeric",
  // });

  return (
    <>
      <button
        className="details-trigger-btn"
        onClick={() => setOpen(true)}
      >
        <Eye size={18} />
      </button>

      {open && (
        <>
          <div className="drawer-overlay" onClick={() => setOpen(false)} />

          <aside className="order-drawer">

            <div className="drawer-header">
              <div>
                <h2>Order Details</h2>
                <p>{order.orderNumber}</p>
              </div>
              <button className="drawer-close" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="drawer-section">
              <h4><User size={18} /> Customer</h4>
              <div className="drawer-card">
                <h3>{order.customer.name}</h3>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
              </div>
            </div>

            <div className="drawer-section">
              <h4><Package size={18} /> Products</h4>
              {order.items.map((item, i) => (
                <div className="drawer-card" key={i}>
                  <div className="drawer-row">
                    <span>{item.name}</span>
                    <strong>₹{item.priceAtSale.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="drawer-row">
                    <span>Quantity</span>
                    <strong>{item.quantity}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-section">
              <h4><Truck size={18} /> Shipping</h4>
              <div className="drawer-card">
                <p>Status: {order.orderStatus}</p>
                {order.deliveryDate && (
                  <><p>Expected Delivery</p><strong>{new Date(order.deliveryDate).toLocaleDateString("en-IN")}</strong></>
                )}
                {order.shipment?.address && <p>{order.shipment.address}</p>}
                {order.shipment?.courierName && <p>Courier: {order.shipment.courierName}</p>}
                {order.shipment?.trackingNumber && <p>Tracking: {order.shipment.trackingNumber}</p>}
              </div>
            </div>

            <div className="drawer-section">
              <h4><CreditCard size={18} /> Payment</h4>
              <div className="drawer-card">
                <div className="drawer-row">
                  <span>Method</span>
                  <strong>{order.payment.method}</strong>
                </div>
                <div className="drawer-row">
                  <span>Status</span>
                  <span className={order.payment.status === "Fully Settled" ? "paid" : "pending"}>
                    {order.payment.status}
                  </span>
                </div>
                <div className="drawer-row">
                  <span>Paid</span>
                  <strong>₹{order.payment.amountPaid.toLocaleString("en-IN")}</strong>
                </div>
                <div className="drawer-row">
                  <span>Remaining</span>
                  <strong>₹{order.payment.remainingAmount.toLocaleString("en-IN")}</strong>
                </div>
                <div className="drawer-row">
                  <span>Total</span>
                  <strong>₹{order.totalAmount.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="drawer-section">
                <h4><MapPin size={18} /> Notes</h4>
                <div className="drawer-card"><p>{order.notes}</p></div>
              </div>
            )}

          </aside>
        </>
      )}
    </>
  );
}

export default OrderDetailsDrawer;