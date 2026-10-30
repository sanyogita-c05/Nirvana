import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const brandContent = (
    <>
      <img
        src="/nirvana_transformation_academy_logo.jpg"
        alt="ArtisanSuite Logo"
        className="logo"
      />

      <span className="brand-text">
        Artisan<span>Suite</span>
      </span>
    </>
  );

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* =========================
            LOGO / BRAND
            Home page: plain div (arrow cursor, not clickable)
            Other pages: link back to home
        ========================= */}
        {isHome ? (
          <div className="brand brand--static">{brandContent}</div>
        ) : (
          <Link to="/" className="brand" onClick={closeMenu}>
            {brandContent}
          </Link>
        )}

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}
        <nav className="nav-links">

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            How It Works
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>

        </nav>

        {/* =========================
            LOGIN
        ========================= */}
        <div className="nav-actions">
          <Link
            to="/login"
            className="btn btn-primary"
            onClick={closeMenu}
          >
            Login
          </Link>
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          type="button"
          className="menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <FiX size={28} />
          ) : (
            <FiMenu size={28} />
          )}
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}
      {menuOpen && (
        <div className="mobile-menu">

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/how-it-works"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            How It Works
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "mobile-nav-link active" : "mobile-nav-link"
            }
          >
            Contact
          </NavLink>

          <Link
            to="/login"
            className="btn btn-primary mobile-login"
            onClick={closeMenu}
          >
            Login
          </Link>

        </div>
      )}
    </header>
  );
}

export default Navbar;