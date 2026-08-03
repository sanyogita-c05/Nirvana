import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  LogOut,
  Bell,
  X,
} from "lucide-react";

import { getStoredUser, clearStoredUser, onUserUpdated } from "../../utils/userStore";

function MobileSidebar({ open, onClose }) {

  const [user, setUser] = useState(() => getStoredUser() || {});

  // CHANGED: live-updates when Settings/Login/Signup change the stored user
  useEffect(() => {
    return onUserUpdated((updated) => setUser(updated || {}));
  }, []);

  const studioName = user.studio || "Your Craft Studio";

  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Inventory", path: "/inventory", icon: <Package size={20} /> },
    { title: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
    { title: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { title: "Notifications", path: "/notifications", icon: <Bell size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    // CHANGED: was localStorage.removeItem("token") only — user data was
    // never cleared, so a different user logging in on the same browser
    // would briefly see the previous user's studio name/address
    clearStoredUser();
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`mobile-sidebar-overlay ${open ? "show" : ""}`}
      onClick={onClose}
    >
      <aside
        className={`mobile-sidebar ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-sidebar-header">
          <div>
            <h2>ArtisanSuite</h2>
            <p>Craft Business</p>
          </div>

          <button
            className="icon-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="studio-card">
          <p className="studio-label">
            YOUR STUDIO
          </p>

          <h3>{studioName}</h3>

          <p className="studio-location">
            {user.address || "Add your location in Settings"}
          </p>

          <span className="studio-status">
            ● Shop Open
          </span>
        </div>

        <nav className="sidebar-nav">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-nav-item active"
                  : "sidebar-nav-item"
              }
            >
              {item.icon}

              <span>{item.title}</span>

            </NavLink>
          ))}

        </nav>

        <div className="sidebar-footer">

          <NavLink
            to="/customer-view"
            className="customer-mode-btn"
            onClick={onClose}
          >
            <Users size={20} />
            <span>Customer Mode</span>
          </NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </div>
  );
}

export default MobileSidebar;