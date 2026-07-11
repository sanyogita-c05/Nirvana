function TopSellingCard() {
  const products = [
    {
      name: "Ceramic Vase",
      sold: 124,
    },
    {
      name: "Crochet Bag",
      sold: 102,
    },
    {
      name: "Soy Candle",
      sold: 89,
    },
    {
      name: "Resin Tray",
      sold: 71,
    },
  ];

  return (
    <div className="inventory-section-card">

      <div className="inventory-section-header">
        <h3>Top Selling</h3>
      </div>

      {products.map((item) => (
        <div
          key={item.name}
          className="top-selling-row"
        >
          <span>{item.name}</span>

          <strong>{item.sold}</strong>
        </div>
      ))}

    </div>
  );
}

export default TopSellingCard;