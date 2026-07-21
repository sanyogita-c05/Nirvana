import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/productApi";
import "../styles/customer.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="product-details-card">
          <h2>Loading product...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="product-details-card">
          <h2>Product not found</h2>

          <Link
            to="/customer-view"
            className="back-btn"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = `http://localhost:5000${product.imagePath}`;

  return (
    <div className="product-details-page">
      <div className="product-details-card">

        <div className="product-details-image-wrap">
          <img
            src={imageUrl}
            alt={product.name}
            className="product-details-image"
          />
        </div>

        <div className="product-details-content">

          <Link
            to="/customer-view"
            className="back-btn"
          >
            ← Back to Store
          </Link>

          <span className="product-category-pill">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="product-price-rating">
            <p className="product-price">
              ₹{product.sellingPrice}
            </p>
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-meta">

            <div className="meta-box">
              <span>Availability</span>
              <strong>
                {product.stockQuantity > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </strong>
            </div>

            <div className="meta-box">
              <span>Stock Left</span>
              <strong>
                {product.stockQuantity}
              </strong>
            </div>

            <div className="meta-box">
              <span>Category</span>
              <strong>
                {product.category}
              </strong>
            </div>

          </div>

          <div className="details-actions">
            <button
              className="buy-btn"
              disabled={product.stockQuantity === 0}
            >
              {product.stockQuantity === 0
                ? "Out of Stock"
                : "Buy Now"}
            </button>

            <button className="wishlist-btn">
              Add to Wishlist
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;