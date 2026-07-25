import { useEffect, useState } from "react";
import api from "../../api/api";

function TopSellingCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await api.get("/products/top-selling");
        setProducts(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load top selling products.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);


  return (
    <div className="inventory-section-card">

      <div className="inventory-section-header">
        <h3>Top Selling</h3>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && products.length === 0 && <p>No sales yet.</p>}

      {!loading &&
        !error &&
        products.map((item) => (
          <div key={item._id} className="top-selling-row">
            <span>{item.name}</span>
            <strong>{item.totalSold}</strong>
          </div>
        ))}

    </div>
  );
}

export default TopSellingCard;