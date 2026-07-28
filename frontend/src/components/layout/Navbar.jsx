import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div
          className="brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src="/nirvana_transformation_academy_logo.jpg"
            alt="ArtisanSuite Logo"
            style={{
              width: "clamp(42px, 5vw, 60px)",
              height: "clamp(42px, 5vw, 60px)",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />

          <span
            className="brand-text"
            style={{
              fontSize: "clamp(1.5rem, 2vw, 2rem)",
              fontWeight: "700",
              lineHeight: "1",
            }}
          >
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
            Login 
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;