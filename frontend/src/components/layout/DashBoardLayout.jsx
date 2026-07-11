import { NavLink, Link } from "react-router-dom";

function DashboardLayout({ children }) {
  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: "⌘" },
    { label: "Inventory", to: "/inventory", icon: "▣" },
    { label: "Orders", to: "/orders", icon: "◫" },
    { label: "Add Product", to: "/add-product", icon: "+" },
    { label: "Analytics", to: "/analytics", icon: "◔" },
    { label: "Settings", to: "/settings", icon: "⚙" },
  ];

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar__brand">
          <div className="dashboard-sidebar__logo">✦</div>
          <div>
            <p className="dashboard-sidebar__brand-name">ArtisanSuite</p>
            <span className="dashboard-sidebar__brand-sub">
              craft business suite
            </span>
          </div>
        </div>

        <div className="dashboard-sidebar__studio">
          <p className="dashboard-sidebar__studio-label">YOUR STUDIO</p>
          <h3>Meera&apos;s Craft Studio</h3>
          <p>Jaipur, Rajasthan</p>
          <span className="dashboard-sidebar__status">● Shop is open</span>
        </div>

        <nav className="dashboard-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "dashboard-sidebar__link active"
                  : "dashboard-sidebar__link"
              }
            >
              <span className="dashboard-sidebar__icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-sidebar__footer">
          <Link to="/" className="dashboard-sidebar__back">
            ← Back to website
          </Link>
        </div>
      </aside>

      <div className="dashboard-content-area">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar__left">
            <h2>Dashboard</h2>
            <p>Welcome back to your studio workspace</p>
          </div>

          <div className="dashboard-topbar__actions">
            <div className="dashboard-view-toggle">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-chip active"
                    : "dashboard-chip"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/customer-view"
                className={({ isActive }) =>
                  isActive
                    ? "dashboard-chip active"
                    : "dashboard-chip"
                }
              >
                Customer View
              </NavLink>
            </div>

            <button className="dashboard-notify" type="button">
              🔔
            </button>

            <div className="dashboard-avatar">M</div>
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;