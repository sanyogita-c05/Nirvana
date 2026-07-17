import { Link } from "react-router-dom";

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
          <a href="#stories">Stories</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-primary">
            Login →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;