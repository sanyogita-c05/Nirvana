import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "../styles/customer.css";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="product-details-card">
          <h2>Product not found</h2>
          <Link to="/customer-view" className="back-btn">
            ← Back to store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-card">
        <div className="product-details-image-wrap">
          <img src={product.image} alt={product.name} className="product-details-image" />
        </div>

        <div className="product-details-content">
          <Link to="/customer-view" className="back-btn">
            ← Back to store
          </Link>

          <span className="product-category-pill">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="product-price-rating">
            <p className="product-price">₹{product.price}</p>
            <span className="product-rating">⭐ {product.rating}</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div className="meta-box">
              <span>Availability</span>
              <strong>{product.stock > 0 ? "In Stock" : "Out of Stock"}</strong>
            </div>
            <div className="meta-box">
              <span>Stock Left</span>
              <strong>{product.stock}</strong>
            </div>
            <div className="meta-box">
              <span>Craft Type</span>
              <strong>{product.category}</strong>
            </div>
          </div>

          <div className="details-actions">
            <button className="buy-btn">Buy Now</button>
            <button className="wishlist-btn">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;