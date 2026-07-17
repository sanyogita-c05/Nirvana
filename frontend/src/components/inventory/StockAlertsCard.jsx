function StockAlertsCard({ products }) {

  const lowStock = products.filter(
    (product) =>
      product.stockQuantity > 0 &&
      product.stockQuantity <= 5
  );

  return (
    <div className="inventory-section-card">

      <div className="inventory-section-header">
        <h3>Low Stock Alerts</h3>
      </div>

      <div className="inventory-list">

        {lowStock.length === 0 ? (
          <p>No low stock products 🎉</p>
        ) : (
          lowStock.map((product) => (

            <div
              className="inventory-list-item"
              key={product._id}
            >

              <img
                src={`http://localhost:5000${product.imagePath}`}
                alt={product.name}
                className="inventory-list-icon"
              />

              <div className="inventory-list-info">

                <h4>{product.name}</h4>

                <p>
                  {product.stockQuantity} items left
                </p>

              </div>

              <button>
                Restock
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default StockAlertsCard;