function RecentlyAddedCard({ products }) {

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 4);

  return (
    <div className="inventory-section-card">

      <div className="inventory-section-header">
        <h3>Recently Added</h3>
      </div>

      <div className="inventory-list">

        {recentProducts.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          recentProducts.map((product) => (
            <div
              className="inventory-list-item"
              key={product._id}
            >

              <img
                src={
                  product.images?.[0]?.url
                    ? `http://localhost:5000${product.images[0].url}`
                    : "/placeholder-product.png"
                }
                alt={product.name}
                className="inventory-list-icon"
              />

              <div className="inventory-list-info">

                <h4>{product.name}</h4>

                <p>{product.category}</p>

              </div>

              <span>
                {new Date(
                  product.createdAt
                ).toLocaleDateString()}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default RecentlyAddedCard;