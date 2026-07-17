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

function OrderDetailsDrawer() {
  const [open, setOpen] = useState(false);

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
          <div
            className="drawer-overlay"
            onClick={() => setOpen(false)}
          />

          <aside className="order-drawer">

            <div className="drawer-header">

              <div>
                <h2>Order Details</h2>
                <p>#ORD-1024</p>
              </div>

              <button
                className="drawer-close"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>

            </div>

            <div className="drawer-section">

              <h4>
                <User size={18} />
                Customer
              </h4>

              <div className="drawer-card">

                <h3>Emma Watson</h3>

                <p>emma@email.com</p>

                <p>+91 9876543210</p>

              </div>

            </div>

            <div className="drawer-section">

              <h4>
                <Package size={18} />
                Product
              </h4>

              <div className="drawer-card">

                <div className="drawer-row">
                  <span>Handmade Vase</span>
                  <strong>₹2450</strong>
                </div>

                <div className="drawer-row">
                  <span>Quantity</span>
                  <strong>2</strong>
                </div>

              </div>

            </div>

            <div className="drawer-section">

              <h4>
                <Truck size={18} />
                Shipping
              </h4>

              <div className="drawer-card">

                <p>Processing</p>

                <p>Expected Delivery</p>

                <strong>15 July 2026</strong>

              </div>

            </div>

            <div className="drawer-section">

              <h4>
                <CreditCard size={18} />
                Payment
              </h4>

              <div className="drawer-card">

                <div className="drawer-row">
                  <span>Method</span>
                  <strong>UPI</strong>
                </div>

                <div className="drawer-row">
                  <span>Status</span>
                  <span className="paid">
                    Paid
                  </span>
                </div>

              </div>

            </div>

            <div className="drawer-section">

              <h4>
                <MapPin size={18} />
                Address
              </h4>

              <div className="drawer-card">

                <p>
                  12 MG Road,
                  <br />
                  Pune,
                  <br />
                  Maharashtra
                </p>

              </div>

            </div>

          </aside>

        </>
      )}
    </>
  );
}

export default OrderDetailsDrawer;