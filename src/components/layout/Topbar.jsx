import { Bell, Menu } from "lucide-react";

function Topbar({ onMenuClick }) {
  return (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>

        <div className="brand-block">
          <div className="brand-logo">✦</div>
          <h2>ArtisanSuite</h2>
        </div>
      </div>

      <div className="topbar-right">
        <div className="mode-toggle">
          <button className="mode-btn active">Dashboard</button>
          <button className="mode-btn">Customer View</button>
        </div>

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <div className="profile-avatar">M</div>
      </div>
    </header>
  );
}

export default Topbar;