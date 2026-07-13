import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl = `http://localhost:5000${product.imagePath}`;

  const outOfStock = product.stockQuantity === 0;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-card-body">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-rating-row">
          <span className="stock-text">
            {outOfStock
              ? "Out of Stock"
              : `${product.stockQuantity} in stock`}
          </span>
        </div>

        <div className="product-bottom">
          <strong>₹{product.sellingPrice}</strong>

          <Link
            to={`/customer/product/${product._id}`}
            className={`view-btn ${outOfStock ? "disabled" : ""}`}
          >
            {outOfStock ? "Out of Stock" : "View Product"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;