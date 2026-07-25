import DashBoardLayout from "../../components/layout/DashBoardLayout";
import NotificationsBanner from "../../components/notifications/NotificationsBanner";
import NotificationCard from "../../components/notifications/NotificationCard";
import "./Notifications.css";

const notifications = [
  { id: 1, type: "warning", title: "Gas leak threshold is almost exceeded", meta: "Warning", time: "a few seconds ago", unread: true },
  { id: 2, type: "danger", title: "Gas leak threshold was exceeded", meta: "Danger", time: "a day ago", unread: false },
  { id: 3, type: "warning", title: "Low stock: Lavender Soy Candle", meta: "Warning", time: "a day ago", unread: false },
  { id: 4, type: "danger", title: "Fire was detected in Workshop Room", meta: "Danger", time: "a day ago", unread: false },
  { id: 5, type: "info", title: "New order received from Priya Sharma", meta: "Info", time: "a day ago", unread: false },
  { id: 6, type: "danger", title: "Gas leak threshold was exceeded", meta: "Danger", time: "2 days ago", unread: false },
  { id: 7, type: "system", title: "Settings updated successfully", meta: "Info", time: "2 days ago", unread: false },
  { id: 8, type: "info", title: "Monthly revenue report is ready", meta: "Info", time: "2 days ago", unread: false },
  { id: 9, type: "warning", title: "Payment pending for Order #1042", meta: "Warning", time: "3 days ago", unread: false },
  { id: 10, type: "danger", title: "Gas leak threshold was exceeded", meta: "Danger", time: "3 days ago", unread: false },
];

function Notifications() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DashBoardLayout>
      <div className="notifications-page">
        <NotificationsBanner />

        <div className="notifications-body">
          <div className="notifications-header">
            <div>
              <h1>Notifications</h1>
              <p className="notifications-subtitle">
                {unreadCount} new notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="notifications-check-badge">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </div>

          <div className="notifications-list">
            {notifications.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default Notifications;