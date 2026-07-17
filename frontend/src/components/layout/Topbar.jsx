import { Bell, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCustomerView = location.pathname.startsWith("/customer");

  return (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <button
          className="icon-btn mobile-menu-btn"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>

        <div className="brand-block">
          <div className="brand-logo">✦</div>
          <h2>ArtisanSuite</h2>
        </div>
      </div>

      <div className="topbar-right">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${!isCustomerView ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`mode-btn ${isCustomerView ? "active" : ""}`}
            onClick={() => navigate("/customer-view")}
          >
            Customer View
          </button>
        </div>

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <button
          className="profile-avatar"
          onClick={() => navigate("/profile")}
          title="View profile"
        >
          M
        </button>
      </div>
    </header>
  );
}

export default Topbar;