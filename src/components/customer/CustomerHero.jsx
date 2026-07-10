function CustomerHero() {
  return (
    <section className="customer-hero">
      <div className="customer-hero-copy">
        <span className="hero-chip">Handmade • Curated • Vibrant</span>
        <h2>Crafted pieces for rooms, gifts, stories and little everyday joy.</h2>
        <p>
          Discover handmade bags, bouquets, resin art, home decor, jewelry and
          custom artisan pieces — all in one colorful Nirvana storefront.
        </p>

        <div className="hero-mini-stats">
          <div className="hero-stat">
            <strong>13+</strong>
            <span>Artisan products</span>
          </div>
          <div className="hero-stat">
            <strong>8+</strong>
            <span>Creative categories</span>
          </div>
          <div className="hero-stat">
            <strong>4.8★</strong>
            <span>Craft-led favourites</span>
          </div>
        </div>
      </div>

      <div className="customer-hero-card">
        <div className="hero-card-top">
          <span>Trending this week</span>
          <strong>Artisan Edit</strong>
        </div>

        <div className="hero-feature-list">
          <div className="hero-feature-item pink">
            <h4>Home Decor</h4>
            <p>Vases, clocks, textile art & crafted room accents.</p>
          </div>

          <div className="hero-feature-item orange">
            <h4>Gift Picks</h4>
            <p>Bouquets, bookmarks, custom keepsakes and more.</p>
          </div>

          <div className="hero-feature-item purple">
            <h4>Accessories</h4>
            <p>Jewelry, bangles, bags and handmade add-ons.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerHero;