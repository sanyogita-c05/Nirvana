import React, { useState, useMemo } from "react";
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

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: "Package",
    title: "New order received",
    tag: "Urgent",
    category: "Orders",
    message:
      "Sanyogita Vijayrao Chavan placed an order for Hand-Painted Tote Bag (\u20b9499). Order #ORD0005 is awaiting confirmation.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    icon: "CheckCircle2",
    title: "Payment confirmed",
    tag: "New",
    category: "Payments",
    message:
      "\u20b9499 received for Hand-Painted Tote Bag \u2014 order ORD0004. Transaction TXN-9912873 processed successfully.",
    time: "18 minutes ago",
    read: false,
  },
  {
    id: 3,
    icon: "Star",
    title: "New 5-star review",
    tag: "New",
    category: "Reviews",
    message:
      "Sai Patil left a 5-star review on Hand-Painted Tote Bag: \u201cBeautiful craftsmanship, exactly as pictured.\u201d",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    icon: "AlertTriangle",
    title: "Low stock alert",
    tag: "Info",
    category: "Inventory",
    message: "Rajasthani Blue Pottery Set has only 2 units left. Restock soon to avoid missed orders.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    icon: "Truck",
    title: "Order shipped",
    tag: "Info",
    category: "Shipping",
    message: "Order #ORD0003 for Madhubani Painting \u2014 'Tree of Life' has been handed to the courier.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    icon: "CheckCircle2",
    title: "Payment confirmed",
    tag: "Info",
    category: "Payments",
    message:
      "\u20b91,200 received for Terracotta Wall Hanging \u2014 order ORD0002. Transaction TXN-9911204 processed successfully.",
    time: "2 days ago",
    read: true,
  },
];

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
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      All: notifications.length,
      Unread: notifications.filter((n) => !n.read).length,
      Read: notifications.filter((n) => n.read).length,
    }),
    [notifications]
  );

  const visible = useMemo(() => {
    return notifications
      .filter((n) => (filter === "All" ? true : filter === "Unread" ? !n.read : n.read))
      .filter((n) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
      });
  }, [notifications, filter, query]);

  const markAsRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const remove = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setNotifications([]);

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
              const Icon = ICONS[n.icon];
              const color = CATEGORY_COLOR[n.category];
              return (
                <div key={n.id} className={`notif-card${!n.read ? " unread" : ""}`}>
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
                        {!n.read && <span className="notif-dot" />}
                        <button
                          className="notif-icon-btn"
                          onClick={() => remove(n.id)}
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
                      <span className="notif-time">{n.time}</span>
                      {!n.read && (
                        <button className="notif-mark-read" onClick={() => markAsRead(n.id)}>
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