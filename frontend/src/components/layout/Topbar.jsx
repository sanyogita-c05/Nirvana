import { Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getStoredUser,
  setStoredUser,
  onUserUpdated,
} from "../../utils/userStore";

import api from "../../api/api";

function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCustomerView = location.pathname.startsWith("/customer");

  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    // Keep Topbar synchronized whenever user information changes.
    const unsubscribe = onUserUpdated(setUser);

    // If user data is not available in the shared store,
    // fetch it from the backend.
    if (!user?.fullName && !user?.studio) {
      api
        .get("/auth/me")
        .then((res) => {
          setStoredUser(res.data.data);
        })
        .catch(() => {
          // Avatar will simply fall back to the user's initial.
        });
    }

    return unsubscribe;

    // We only want this effect to run once when Topbar mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback initial when there is no profile image.
  const initial = (
    user?.studio ||
    user?.fullName ||
    "?"
  )
    .trim()
    .charAt(0)
    .toUpperCase();

  // Backend stores the avatar as something like:
  // /uploads/avatars/filename.jpg
  //
  // So we prepend localhost:5000.
  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:5000${user.avatar}`
    : null;

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

        {/* Notifications */}
        <button
          className="icon-btn"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell size={20} />
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
                // If image fails to load, hide it so the
                // initial can be shown instead.
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