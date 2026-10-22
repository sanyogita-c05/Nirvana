import { Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getStoredUser,
  setStoredUser,
  onUserUpdated,
} from "../../utils/userStore";

import api from "../../api/api";
import { getNotifications } from "../../api/notificationApi";

function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCustomerView = location.pathname.startsWith("/customer");

  const [user, setUser] = useState(getStoredUser());
  const [unreadCount, setUnreadCount] = useState(0);

  // Keep user info in sync
  useEffect(() => {
    const unsubscribe = onUserUpdated(setUser);

    if (!user?.fullName && !user?.studio) {
      api
        .get("/auth/me")
        .then((res) => {
          setStoredUser(res.data.data);
        })
        .catch(() => {
          // Avatar will fall back to the user's initial.
        });
    }

    return unsubscribe;

    // Run once when Topbar mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Unread notification count for the bell badge
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await getNotifications();
        setUnreadCount(res.data.data.filter((n) => !n.isRead).length);
      } catch {
        // keep the previous count if the request fails
      }
    };

    fetchUnread();
    const timer = setInterval(fetchUnread, 30000);

    // Lets the Notifications page tell the bell to refresh instantly
    window.addEventListener("notifications-updated", fetchUnread);

    return () => {
      clearInterval(timer);
      window.removeEventListener("notifications-updated", fetchUnread);
    };
  }, [location.pathname]);

  const initial = (user?.studio || user?.fullName || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:5000${user.avatar}`
    : null;

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

        {/* Notifications */}
        <button
          className="icon-btn bell-btn"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="bell-badge">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        <button
          className="profile-avatar"
          onClick={() => navigate("/profile")}
          title="View profile"
          style={{
            overflow: "hidden",
            borderRadius: "50%",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.fullName || "Profile"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
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