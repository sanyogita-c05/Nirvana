import { products } from "../data/products";

function Store() {
  return (
    <div className="store-page">
      <div className="container">
        <div className="store-header">
          <p className="store-label">OUR COLLECTION</p>
          <h1>Handmade pieces, stitched with story and soul.</h1>
          <p>
            Explore bags, decor, resin art, jewelry, bouquets, and more from
            Nirvana’s artisan collection.
          </p>
        </div>

        <div className="store-grid">
          {products.map((product) => (
            <div className="store-card" key={product.id}>
              <div className="store-image-wrap">
                <img src={product.image} alt={product.name} className="store-image" />
              </div>

              <div className="store-card-body">
                <span className="store-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="store-meta">
                  <strong>₹{product.price}</strong>
                  <span>{product.stock} in stock</span>
                </div>

                <button className="store-btn">View Product</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;