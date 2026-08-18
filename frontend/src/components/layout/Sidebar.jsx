import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getStoredUser, setStoredUser, onUserUpdated } from "../../utils/userStore";

function Sidebar() {

  const navigate = useNavigate();

  // CHANGED: was independent local state (studioName/fullName/address/loading)
  // fetched once on mount — never updated again after that. Replaced with
  // the shared store, same pattern as Topbar.jsx.
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    // ADDED: subscribe so Sidebar re-renders instantly whenever
    // ProfileSettingsForm (or anything else) calls setStoredUser.
    const unsubscribe = onUserUpdated(setUser);

    // Fallback fetch only if the store is genuinely empty (e.g. very
    // first load of the whole app before anything else populated it).
    if (!user?.fullName && !user?.studio) {
      api
        .get("/auth/me")
        .then((res) => setStoredUser(res.data.data))
        .catch(() => {
          // Sidebar stays on fallback text below if this fails —
          // not worth a visible error state for a persistent nav element.
        });
    }

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <Package size={20} />,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="dashboard-sidebar">

      <div>

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

      </div>

      <div className="sidebar-footer">

        <NavLink
          to="/customer-view"
          className="customer-mode-btn"
        >
          <Users size={20} />
          <span>Customer Mode</span>
        </NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;