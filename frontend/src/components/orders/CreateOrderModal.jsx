import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createOrder } from "../../api/orderApi";
import { getProducts } from "../../api/productApi";

// Customer contact rules. Keep these in sync with order.controller.js,
// which enforces the same limits on the server.
const PHONE_MAX_LENGTH = 20;
const EMAIL_MAX_LENGTH = 100;

// 10-digit Indian mobile number (starts with 6-9), optional +91 prefix.
// Spaces and hyphens are ignored before this is checked.
const PHONE_REGEX = /^(\+91)?[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldErrorStyle = { color: "red", fontSize: 13, margin: "4px 0 0" };

const validatePhone = (value) => {
  const phone = value.trim();

  if (!phone) return "Customer phone number is required.";

  if (phone.length > PHONE_MAX_LENGTH) {
    return `Phone number cannot exceed ${PHONE_MAX_LENGTH} characters.`;
  }

  if (!PHONE_REGEX.test(phone.replace(/[\s-]/g, ""))) {
    return "Enter a valid 10-digit mobile number (optionally starting with +91).";
  }

  return "";
};

const validateEmail = (value) => {
  const email = value.trim();

  if (!email) return "Customer email is required.";

  if (email.length > EMAIL_MAX_LENGTH) {
    return `Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`;
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Enter a valid email address, like name@example.com.";
  }

  return "";
};

function CreateOrderModal({ open, onClose, refreshOrders }) {
  const [products, setProducts] = useState([]);

  const getLocalDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const emptyForm = () => ({
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
    source: "Website",
  });

  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      // Start every new order with a blank form and today's date
      setForm(emptyForm());
      setFieldErrors({});
      setError("");
      getProducts()
        .then((res) => setProducts(res.data.data))
        .catch(() => { });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear a field's error as soon as the user starts fixing it
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Empty fields are caught by `required` when the form is submitted
    if (!value.trim()) return;

    if (name === "customerPhone") {
      setFieldErrors((prev) => ({ ...prev, customerPhone: validatePhone(value) }));
    }

    if (name === "customerEmail") {
      setFieldErrors((prev) => ({ ...prev, customerEmail: validateEmail(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errors = {
      customerPhone: validatePhone(form.customerPhone),
      customerEmail: validateEmail(form.customerEmail),
    };

    if (errors.customerPhone || errors.customerEmail) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        customer: {
          name: form.customerName,
          phone: form.customerPhone.trim(),
          email: form.customerEmail.trim(),
          city: form.customerCity,
        },
        items: [{ productId: form.productId, quantity: Number(form.quantity) }],
        payment: {
          method: form.paymentMethod,
          amountPaid: Number(form.amountPaid),
        },
        orderDate: form.orderDate,
        notes: form.notes,
        source: form.source,
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
            <input
              name="customerPhone"
              type="tel"
              placeholder="+91 XXXXXXXXXX"
              maxLength={PHONE_MAX_LENGTH}
              value={form.customerPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.customerPhone)}
              required
            />
            {fieldErrors.customerPhone && (
              <p style={fieldErrorStyle}>{fieldErrors.customerPhone}</p>
            )}
          </div>

          <div className="form-group">
            <label>Customer Email</label>
            <input
              name="customerEmail"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="customer@email.com"
              maxLength={EMAIL_MAX_LENGTH}
              value={form.customerEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.customerEmail)}
              required
            />
            {fieldErrors.customerEmail && (
              <p style={fieldErrorStyle}>{fieldErrors.customerEmail}</p>
            )}
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

          <div className="form-grid">
            <div className="form-group">
              <label>Order Source</label>
              <select name="source" value={form.source} onChange={handleChange} required>
                <option value="Instagram">Instagram</option>
                <option value="Website">Website</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Other">Other</option>
              </select>
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