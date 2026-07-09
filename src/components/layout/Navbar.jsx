function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="brand-icon">🌸</div>
          <span className="brand-text">
            Artisan<span>Suite</span>
          </span>
        </div>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#stories">Stories</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-link">Sign In</button>
          <button className="btn btn-primary">Start Free →</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;