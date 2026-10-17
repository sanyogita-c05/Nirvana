import { useState } from "react";
import { X } from "lucide-react";
import { updateOrder } from "../../api/orderApi";

function EditOrderModal({ order, onClose, refreshOrders }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        orderStatus: order.orderStatus || "Active",
        amountPaid: order.payment?.amountPaid || 0,
        trackingNumber: order.shipment?.trackingNumber || "",
        shipmentDate: order.shipment?.shipmentDate
            ? order.shipment.shipmentDate.slice(0, 10)
            : "",
        notes: order.notes || "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Same rules as the backend's computeFinancials, so the user sees
    // the status that WILL be saved before clicking Update.
    const total = order.totalAmount || 0;
    const paid = Number(form.amountPaid) || 0;
    const remaining = Math.max(total - paid, 0);

    let livePaymentStatus = "Unpaid";
    if (total === 0 || paid === total) livePaymentStatus = "Fully Settled";
    else if (paid > 0 && paid < total) livePaymentStatus = "Partially Paid";

    const payInFull = () => {
        setForm((prev) => ({ ...prev, amountPaid: total }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await updateOrder(order._id, {
                orderStatus: form.orderStatus,

                payment: {
                    amountPaid: Number(form.amountPaid),
                },

                shipment: {
                    trackingNumber: form.trackingNumber,
                    shipmentDate: form.shipmentDate,
                },

                notes: form.notes,
            });

            await refreshOrders();

            onClose();

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to update order."
            );
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
                        <h2>Edit Order</h2>
                        <p>Update order information.</p>
                    </div>

                    <button className="close-modal" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <p style={{ color: "red", paddingBottom: 10 }}>
                        {error}
                    </p>
                )}

                <form className="order-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Order Status</label>

                        <select
                            name="orderStatus"
                            value={form.orderStatus}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Closed">Closed</option>
                        </select>

                    </div>

                    <div className="form-group">
                        <label>
                            Amount Paid (Total: ₹{total.toLocaleString("en-IN")})
                        </label>

                        <input
                            type="number"
                            name="amountPaid"
                            min="0"
                            max={total}
                            value={form.amountPaid}
                            onChange={handleChange}
                        />

                        {paid < total && (
                            <button
                                type="button"
                                className="cancel-btn"
                                style={{ height: 38, alignSelf: "flex-start" }}
                                onClick={payInFull}
                            >
                                Mark as fully paid
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Payment Status (auto)</label>

                        <input
                            value={
                                livePaymentStatus === "Partially Paid"
                                    ? `Partially Paid — ₹${remaining.toLocaleString("en-IN")} remaining`
                                    : livePaymentStatus
                            }
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Tracking Number</label>

                        <input
                            name="trackingNumber"
                            value={form.trackingNumber}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">
                        <label>Shipment Date</label>

                        <input
                            type="date"
                            name="shipmentDate"
                            value={form.shipmentDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">
                        <label>Notes</label>

                        <textarea
                            rows="3"
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
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
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Order"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditOrderModal;