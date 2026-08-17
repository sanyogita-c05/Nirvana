import { Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getStoredUser, setStoredUser, onUserUpdated } from "../../utils/userStore";
import api from "../../api/api";


function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCustomerView = location.pathname.startsWith("/customer");

  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    // Stay in sync if the profile changes elsewhere — Settings page edits,
    // Sidebar's fetch resolving, login, etc. all call setStoredUser, and
    // this component re-renders automatically when that happens.
    const unsubscribe = onUserUpdated(setUser);

    // If the store is empty (e.g. a hard refresh on this page before
    // Sidebar's own fetch has resolved), fetch once here and populate the
    // shared store — every other subscriber picks up the same data too.
    if (!user?.fullName && !user?.studio) {
      api
        .get("/auth/me")
        .then((res) => setStoredUser(res.data.data))
        .catch(() => {
          // Avatar just falls back to "?" below — not worth a visible error
          // for a small topbar element.
        });
    }

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initial = (user?.studio || user?.fullName || "?").trim().charAt(0).toUpperCase();



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
          style={{ overflow: "hidden", borderRadius: "50%" }}
        >
          {initial}
        </button>
      </div>
    </header>
  );
}

export default Topbar;