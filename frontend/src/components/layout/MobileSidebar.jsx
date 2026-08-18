import { useEffect, useState } from "react";
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

import api from "../../api/api";
// ADDED: this import was completely missing before — MobileSidebar never
// touched the shared store at all, just did its own isolated fetch.
import { getStoredUser, setStoredUser, onUserUpdated } from "../../utils/userStore";

function MobileSidebar({ open, onClose }) {

  const navigate = useNavigate();

  // CHANGED: replaced studioName/fullName/address/loading local state
  // with the shared store, same pattern as Sidebar.jsx and Topbar.jsx.
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    // ADDED: subscribe so this re-renders instantly on profile updates.
    const unsubscribe = onUserUpdated(setUser);

    if (!user?.fullName && !user?.studio) {
      api
        .get("/auth/me")
        .then((res) => setStoredUser(res.data.data))
        .catch(() => {
          // Sidebar stays on fallback text below if this fails.
        });
    }

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Inventory", path: "/inventory", icon: <Package size={20} /> },
    { title: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
    { title: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { title: "Notifications", path: "/notifications", icon: <Bell size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
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

          {/* CHANGED: reads from shared user state now */}
          <h3>{user?.studio || user?.fullName || "Your Studio"}</h3>

          {user?.address && (
            <p className="studio-location">
              {user.address}
            </p>
          )}

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