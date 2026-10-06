import { useEffect, useState } from "react";

import api from "../../api/api";

function TopSellingProduct() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await api.get("/products/top-selling");
        setData(
          res.data.data.map((product) => ({
            product: product.name,
            orders: product.totalSold ?? 0,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load top selling products.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);

  // Bars are scaled against the best seller, so the leader is always 100%.
  const max = Math.max(...data.map((d) => d.orders), 1);

  return (
    <div className="top-selling-product-card">
      <div className="chart-card-header">
        <div>
          <h3>Top Selling Products</h3>

          <p className="chart-subtitle">
            Products with the highest number of orders
          </p>
        </div>
      </div>

      <div className="chart-area">

        {loading && <p>Loading chart...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && data.length === 0 && <p>No product data yet.</p>}

        {!loading && !error && data.length > 0 && (
          <ul className="rank-list rank-list-orange">
            {data.map((item, index) => (
              <li className="rank-item" key={`${item.product}-${index}`}>
                <span className="rank-badge">{index + 1}</span>

                <div className="rank-body">
                  <div className="rank-row">
                    <span className="rank-name">{item.product}</span>
                    <span className="rank-count">
                      {item.orders} {item.orders === 1 ? "order" : "orders"}
                    </span>
                  </div>

                  <div className="rank-track">
                    <div
                      className="rank-fill"
                      style={{ width: `${(item.orders / max) * 100}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopSellingProduct;