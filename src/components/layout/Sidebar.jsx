import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
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

          <h3>Meera's Craft</h3>

          <p className="studio-location">
            Jaipur, Rajasthan
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

        <button className="logout-btn">

          <LogOut size={20} />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;