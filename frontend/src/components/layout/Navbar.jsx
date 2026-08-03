import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* Logo */}
        <div className="brand">
          <img
            src="/nirvana_transformation_academy_logo.jpg"
            alt="ArtisanSuite Logo"
            className="logo"
          />

          <span className="brand-text">
            Artisan<span>Suite</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="#about">About Us</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
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
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About Us
          </a>

          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How It Works
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

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