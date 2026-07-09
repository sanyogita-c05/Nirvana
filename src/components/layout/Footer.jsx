function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-icon">🌸</div>
            <span className="brand-text">
              Artisan<span>Suite</span>
            </span>
          </div>
          <p>Business tools built with love for India’s handmade creator community.</p>
          <small>Made in India, for Indian artisans</small>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="/">Features</a>
            <a href="/">Inventory</a>
            <a href="/">Orders</a>
            <a href="/">Payments</a>
            <a href="/">Analytics</a>
          </div>

          <div>
            <h4>Crafts We Serve</h4>
            <a href="/">Crochet & Yarn</a>
            <a href="/">Candle Making</a>
            <a href="/">Embroidery</a>
            <a href="/">Clay & Pottery</a>
            <a href="/">Handmade Jewellery</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="/">About Us</a>
            <a href="/">Blog</a>
            <a href="/">Artisan Stories</a>
            <a href="/">Help Centre</a>
            <a href="/">Contact Us</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2025 ArtisanSuite. All rights reserved. Built with ❤️ for Indian craft entrepreneurs.</p>
        <div className="footer-socials">
          <span>Instagram</span>
          <span>WhatsApp</span>
          <span>YouTube</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;