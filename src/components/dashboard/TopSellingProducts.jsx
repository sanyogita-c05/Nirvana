import SectionCard from "./SectionCard";

function TopSellingProducts() {
  const products = [
    { rank: 1, name: "Clay Lotus Diya Set", sold: 89, revenue: "₹33,820", width: "100%" },
    { rank: 2, name: "Lavender Soy Candle", sold: 67, revenue: "₹28,140", width: "76%" },
    { rank: 3, name: "Resin Floral Coaster Set", sold: 45, revenue: "₹29,250", width: "52%" },
    { rank: 4, name: "Hand-crocheted Boho Bag", sold: 34, revenue: "₹28,900", width: "38%" },
  ];

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