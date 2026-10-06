import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* Logo */}
        <Link to="/" className="brand">
          <img
            src="/nirvana_transformation_academy_logo.jpg"
            alt="ArtisanSuite Logo"
            className="logo"
          />

          <span className="brand-text">
            Artisan<span>Suite</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <Link to="/about">About Us</Link>

          <Link to="/how-it-works">How It Works</Link>

          <Link to="/contact">Contact</Link>
        </nav>

        {/* Desktop Login */}
        <div className="nav-actions">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          <Link
            to="/how-it-works"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            to="/login"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

        </div>
      )}
    </header>
  );
}

export default Navbar;