import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import SectionCard from "./SectionCard";

function LowStockCard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await api.get("/products/low-stock");
        setItems(
          res.data.data.map((product) => ({
            name: product.name,
            left: `${product.stockQuantity} left`,
            status: product.stockQuantity === 0 ? "Out of Stock" : "Low Stock",
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load low stock items.");
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, []);

  if (loading) {
    return (
      <SectionCard title="Low Stock Alerts" className="low-stock-card">
        <p>Loading...</p>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Low Stock Alerts" className="low-stock-card">
        <p>{error}</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Low Stock Alerts" className="low-stock-card">
      <div className="low-stock-list">
        {items.length === 0 && <p>No low stock items</p>}
        {items.map((item) => (
          <div key={item.name} className="low-stock-item">
            <div className="low-stock-item__avatar">{item.name.charAt(0)}</div>

            <div className="low-stock-item__info">
              <p>{item.name}</p>
              <span>{item.left}</span>
            </div>

            <span
              className={`stock-badge ${item.status === "Out of Stock" ? "danger" : "warning"
                }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <button className="manage-link" onClick={() => navigate("/inventory")}>
        Manage inventory →
      </button>
    </SectionCard>
  );
}

export default LowStockCard;