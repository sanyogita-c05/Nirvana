import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-rating-row">
          <span className="rating-pill">★ {product.rating}</span>
          <span className="stock-text">{product.stock} in stock</span>
        </div>

        <div className="product-bottom">
          <strong>₹{product.price}</strong>
          <Link to={`/customer/product/${product.id}`} className="view-btn">
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;