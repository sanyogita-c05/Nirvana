import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createOrder } from "../../api/orderApi";
import { getProducts } from "../../api/productApi";

function CreateOrderModal({ open, onClose, refreshOrders }) {
  const [products, setProducts] = useState([]);

  const getLocalDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerCity: "",
    productId: "",
    quantity: 1,
    paymentMethod: "N/A",
    amountPaid: 0,
    orderDate: getLocalDateString(),
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getProducts()
        .then((res) => setProducts(res.data.data))
        .catch(() => { });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createOrder({
        customer: {
          name: form.customerName,
          phone: form.customerPhone,
          email: form.customerEmail,
          city: form.customerCity,
        },
        items: [{ productId: form.productId, quantity: Number(form.quantity) }],
        payment: {
          method: form.paymentMethod,
          amountPaid: Number(form.amountPaid),
        },
        orderDate: form.orderDate,
        notes: form.notes,
      });
      refreshOrders();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

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
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <p style={{ color: "red", padding: "0 0 8px" }}>{error}</p>}

        <form className="order-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Customer Name</label>
            <input name="customerName" type="text" placeholder="Enter customer name" value={form.customerName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Customer Phone</label>
            <input name="customerPhone" type="text" placeholder="+91 XXXXXXXXXX" value={form.customerPhone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Customer Email</label>
            <input name="customerEmail" type="email" placeholder="customer@email.com" value={form.customerEmail} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Customer City</label>
            <input name="customerCity" type="text" placeholder="e.g. Mumbai" value={form.customerCity} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Product</label>
            <select name="productId" value={form.productId} onChange={handleChange} required>
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.stockQuantity})
                </option>
              ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Quantity</label>
              <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Order Date</label>
              <input name="orderDate" type="date" value={form.orderDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                <option value="N/A">N/A</option>
                <option value="Cash">Cash</option>
                <option value="Digital/UPI">Digital/UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount Paid (₹)</label>
              <input name="amountPaid" type="number" min="0" value={form.amountPaid} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" rows="3" placeholder="Additional notes..." value={form.notes} onChange={handleChange} />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Order"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateOrderModal;