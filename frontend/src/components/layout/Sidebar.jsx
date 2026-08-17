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

function Sidebar() {

  const navigate = useNavigate();

  const [studioName, setStudioName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setStudioName(res.data.data.studio);
        setFullName(res.data.data.fullName);
        setAddress(res.data.data.address);
      } catch (err) {
        // Sidebar stays on fallback text below if this fails —
        // not worth a visible error state for a persistent nav element.
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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

          <h3>{loading ? "..." : studioName || fullName || "Your Studio"}</h3>

          {!loading && address && (
            <p className="studio-location">
              {address}
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