function CustomerTopbar() {
  return (
    <header className="customer-topbar">
      <div className="brand-wrap">
        <div className="brand-badge">N</div>
        <div>
          <p className="brand-kicker">NIRVANA STORE</p>
          <h1>Nirvana Artisan Market</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="ghost-btn">Wishlist</button>
        <button className="primary-pill">Cart (0)</button>
      </div>
    </header>
  );
}

export default CustomerTopbar;