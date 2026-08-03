import { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
// CHANGED: use the shared store instead of a plain localStorage read
import { getStoredUser, onUserUpdated } from "../../utils/userStore";


function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => getStoredUser() || {});

  useEffect(() => {
    return onUserUpdated((updated) => setUser(updated || {}));
  }, []);

  // const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isCustomerView = location.pathname.startsWith("/customer");

  const initial =
    (user?.firstName?.charAt(0) || user?.fullName?.charAt(0) || "U").toUpperCase();

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

        <button
          className="icon-btn"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell size={20} />
        </button>
        <button
          className="profile-avatar"
          onClick={() => navigate("/profile")}
          title="View profile"
        >
          {user?.avatar ? (
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            initial
          )}
        </button>
      </div>
    </header>
  );
}

export default Topbar;