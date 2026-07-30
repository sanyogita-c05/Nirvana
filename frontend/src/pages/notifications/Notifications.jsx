import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Package,
  CheckCircle2,
  Star,
  AlertTriangle,
  Truck,
  Bell,
  Search,
  Trash2,
  MoreVertical,
  Check,
} from "lucide-react";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  clearAllNotifications,
} from "../../api/notificationApi";
import "./Notifications.css";

const ICONS = {
  Package: Package,
  CheckCircle2: CheckCircle2,
  Star: Star,
  AlertTriangle: AlertTriangle,
  Truck: Truck,
};

// icon badge color + category tag color share the same key
const CATEGORY_COLOR = {
  Orders: "orange",
  Payments: "pink",
  Reviews: "purple",
  Shipping: "blue",
  Inventory: "yellow",
};

const TAG_CLASS = {
  Urgent: "notif-tag urgent",
  New: "notif-tag new",
  Info: "notif-tag info",
};

// Backend stores createdAt as a real timestamp, not a "2 minutes ago"
// string — this converts on render so it stays accurate as time passes
// (well, accurate as of each re-render; it won't tick live on its own).
function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return "Yesterday";

  return `${diffDay} days ago`;
}

function EmptyState({ filter }) {
  const copy =
    filter === "Unread"
      ? {
          title: "You're all caught up",
          body: "No unread notifications right now. New orders, payments and reviews will show up here.",
        }
      : filter === "Read"
      ? { title: "Nothing read yet", body: "Notifications you've marked as read will collect here." }
      : {
          title: "No notifications yet",
          body: "Your artisan journey is up to date. Orders, reviews and payments will show up here.",
        };

  return (
    <div className="notif-empty">
      <div className="notif-empty-art">
        <span className="notif-empty-dot d1" />
        <span className="notif-empty-dot d2" />
        <span className="notif-empty-dot d3" />
        <svg viewBox="0 0 120 120" width="112" height="112">
          <ellipse cx="60" cy="104" rx="26" ry="4" fill="var(--orange)" opacity="0.15" />
          <path
            d="M40 46 Q40 30 60 30 Q80 30 80 46 L84 88 Q84 100 60 100 Q36 100 36 88 Z"
            fill="var(--orange)"
          />
          <path d="M48 30 Q48 18 60 18 Q72 18 72 30 Z" fill="var(--pink)" />
          <circle cx="49" cy="58" r="5" fill="var(--bg)" />
          <circle cx="71" cy="58" r="5" fill="var(--bg)" />
          <circle cx="49" cy="58" r="1.6" fill="var(--brown)" />
          <circle cx="71" cy="58" r="1.6" fill="var(--brown)" />
          <circle cx="60" cy="76" r="5" fill="var(--bg)" />
        </svg>
      </div>
      <h3>{copy.title}</h3>
      <p>{copy.body}</p>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.data);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError("Could not load notifications. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // fetchNotifications is async and only calls setState after its
    // internal await resolves — this rule's static analysis can't see
    // that timing and flags the call site anyway.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, [fetchNotifications]);

  const counts = useMemo(
    () => ({
      All: notifications.length,
      Unread: notifications.filter((n) => !n.isRead).length,
      Read: notifications.filter((n) => n.isRead).length,
    }),
    [notifications]
  );

  const visible = useMemo(() => {
    return notifications
      .filter((n) => (filter === "All" ? true : filter === "Unread" ? !n.isRead : n.isRead))
      .filter((n) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
      });
  }, [notifications, filter, query]);

  // Optimistic updates (change local state immediately) so the UI feels
  // instant, with the real API call following — if it fails, we just
  // log it; a full page refresh will re-sync from the server either way.
  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );

    try {
      await markNotificationRead(id);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    try {
      await markAllNotificationsRead();
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  const remove = async (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));

    try {
      await deleteNotification(id);
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const clearAll = async () => {
    const confirmClear = window.confirm(
      "Clear all notifications? This can't be undone."
    );

    if (!confirmClear) return;

    setNotifications([]);

    try {
      await clearAllNotifications();
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  if (loading) {
    return (
      <div className="notif-page">
        <div className="notif-container">
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notif-page">
      <div className="notif-container">
        {/* Header */}
        <div className="notif-header">
          <div className="notif-header-left">
            <div className="notif-header-icon">
              <Bell size={22} color="#fff" />
            </div>
            <div>
              <h1 className="notif-title">Notifications</h1>
              <p className="notif-subtitle">Stay updated with your artisan activity</p>
            </div>
          </div>
          <div className="notif-header-actions">
            <button className="notif-btn" onClick={markAllRead}>
              <Check size={15} /> Mark all read
            </button>
            <button className="notif-btn danger" onClick={clearAll}>
              <Trash2 size={15} /> Clear all
            </button>
          </div>
        </div>

        {error && <p className="notif-error">{error}</p>}

        {/* Search */}
        <div className="notif-search">
          <Search size={16} className="notif-search-icon" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders, customers, products..."
          />
        </div>

        {/* Filter pills */}
        <div className="notif-filters">
          {["All", "Unread", "Read"].map((f) => (
            <button
              key={f}
              className={`notif-filter-pill${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f} <span className="notif-filter-count">{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* List */}
        {visible.length === 0 ? (
          <div className="notif-card empty-wrapper">
            <EmptyState filter={filter} />
          </div>
        ) : (
          <div className="notif-list">
            {visible.map((n) => {
              const Icon = ICONS[n.icon] || Bell;
              const color = CATEGORY_COLOR[n.category] || "orange";
              return (
                <div key={n._id} className={`notif-card${!n.isRead ? " unread" : ""}`}>
                  <div className={`notif-icon-badge ${color}`}>
                    <Icon size={19} color="#fff" />
                  </div>

                  <div className="notif-body">
                    <div className="notif-row-top">
                      <div className="notif-title-row">
                        <h3>{n.title}</h3>
                        <span className={TAG_CLASS[n.tag]}>{n.tag}</span>
                        <span className={`notif-tag category ${color}`}>{n.category}</span>
                      </div>
                      <div className="notif-row-icons">
                        {!n.isRead && <span className="notif-dot" />}
                        <button
                          className="notif-icon-btn"
                          onClick={() => remove(n._id)}
                          aria-label="Delete notification"
                        >
                          <Trash2 size={15} />
                        </button>
                        <button className="notif-icon-btn" aria-label="More options">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </div>

                    <p className="notif-message">{n.message}</p>

                    <div className="notif-row-bottom">
                      <span className="notif-time">{timeAgo(n.createdAt)}</span>
                      {!n.isRead && (
                        <button className="notif-mark-read" onClick={() => markAsRead(n._id)}>
                          <Check size={13} /> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}