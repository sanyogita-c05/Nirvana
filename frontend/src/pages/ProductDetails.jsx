import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/productApi";
import "../styles/customer.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data.data);
        setActiveIndex(0);
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

  // Build one combined media list — images first, video last — so a
  // single thumbnail strip can drive both. Falls back to a placeholder
  // if a product somehow has no images (shouldn't happen given the
  // backend's "at least one image" validation, but avoids a blank gallery).
  const mediaItems = [
    ...(product.images?.length
      ? product.images.map((img) => ({
          type: "image",
          url: img.url,
          label: img.originalName,
        }))
      : [{ type: "image", url: null, label: "No image" }]),
    ...(product.video?.url
      ? [{ type: "video", url: product.video.url, label: product.video.originalName }]
      : []),
  ];

  const activeMedia = mediaItems[activeIndex] || mediaItems[0];

  const resolvedUrl = activeMedia.url
    ? `http://localhost:5000${activeMedia.url}`
    : "/placeholder-product.png";

  return (
    <div className="product-details-page">
      <div className="product-details-card">

        <div className="product-details-image-wrap">

          {activeMedia.type === "video" ? (
            <video
              src={resolvedUrl}
              controls
              className="product-details-image"
            />
          ) : (
            <img
              src={resolvedUrl}
              alt={activeMedia.label || product.name}
              className="product-details-image"
            />
          )}

          {mediaItems.length > 1 && (
            <div className="product-details-thumbnail-strip">
              {mediaItems.map((item, index) => (
                <button
                  type="button"
                  key={`${item.type}-${item.url || index}`}
                  className={`product-details-thumbnail ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.type === "video" ? (
                    <span className="thumbnail-video-icon">▶</span>
                  ) : (
                    <img
                      src={
                        item.url
                          ? `http://localhost:5000${item.url}`
                          : "/placeholder-product.png"
                      }
                      alt={item.label || `View ${index + 1}`}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

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