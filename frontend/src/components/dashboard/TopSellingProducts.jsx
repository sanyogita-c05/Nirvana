import { useEffect, useState } from "react";
import api from "../../api/api";
import SectionCard from "./SectionCard";


function TopSellingProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const products = [
  //   { rank: 1, name: "Clay Lotus Diya Set", sold: 89, revenue: "₹33,820", width: "100%" },
  //   { rank: 2, name: "Lavender Soy Candle", sold: 67, revenue: "₹28,140", width: "76%" },
  //   { rank: 3, name: "Resin Floral Coaster Set", sold: 45, revenue: "₹29,250", width: "52%" },
  //   { rank: 4, name: "Hand-crocheted Boho Bag", sold: 34, revenue: "₹28,900", width: "38%" },
  // ];

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await api.get("/products/top-selling");
        const data = res.data.data;
        const maxSold = Math.max(...data.map((p) => p.totalSold), 1);

        setProducts(
          data.map((product, index) => ({
            rank: index + 1,
            name: product.name,
            sold: product.totalSold,
            revenue: `₹${product.totalRevenue.toLocaleString("en-IN")}`,
            width: `${(product.totalSold / maxSold) * 100}%`,
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


  if (loading) {
    return (
      <SectionCard title="Top Selling Products">
        <p>Loading...</p>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Top Selling Products">
        <p>{error}</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Top Selling Products">
      <div className="top-products-list">
        {products.map((product) => (
          <div key={product.rank} className="top-product-item">
            <div className="top-product-item__head">
              <div className="top-product-item__left">
                <span className="rank-badge">{product.rank}</span>
                <p>{product.name}</p>
              </div>

              <div className="top-product-item__right">
                <span>{product.sold} sold</span>
                <strong>{product.revenue}</strong>
              </div>
            </div>

            <div className="top-product-progress">
              <div
                className="top-product-progress__fill"
                style={{ width: product.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default TopSellingProducts;