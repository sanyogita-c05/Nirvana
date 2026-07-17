import { X } from "lucide-react";

function CreateOrderModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="create-order-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <div>
            <h2>Create New Order</h2>
            <p>Fill the details below to create an order.</p>
          </div>

          <button
            className="close-modal"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <form className="order-form">

          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Enter customer name"
            />
          </div>

          <div className="form-group">
            <label>Product</label>
            <input
              type="text"
              placeholder="Product name"
            />
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="1"
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                placeholder="₹0"
              />
            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>Order Status</label>

              <select>
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>

            </div>

            <div className="form-group">

              <label>Payment</label>

              <select>
                <option>Paid</option>
                <option>Pending</option>
              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Notes</label>

            <textarea
              rows="4"
              placeholder="Additional notes..."
            />

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Create Order
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateOrderModal;