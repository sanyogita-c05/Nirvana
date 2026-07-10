import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  PlusCircle,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Inventory", icon: Package },
  { label: "Orders", icon: ShoppingBag },
  { label: "Add Product", icon: PlusCircle },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="dashboard-sidebar desktop-sidebar">
      <div className="studio-card">
        <p className="studio-label">YOUR STUDIO</p>
        <h3>Meera's Craft Studio</h3>
        <p className="studio-location">Jaipur, Rajasthan</p>
        <span className="studio-status">● Shop is open</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`sidebar-nav-item ${item.active ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;