import { AlertTriangle, AlertCircle, Info, Settings } from "lucide-react";

const typeConfig = {
  warning: { icon: AlertTriangle, className: "warning" },
  danger: { icon: AlertCircle, className: "danger" },
  info: { icon: Info, className: "info" },
  system: { icon: Settings, className: "system" },
};

function NotificationCard({ type = "info", title, meta, time, unread }) {
  const { icon: Icon, className } = typeConfig[type] ?? typeConfig.info;

  return (
    <div className={`notification-card ${className} ${unread ? "unread" : ""}`}>
      <span className={`notification-icon ${className}`}>
        <Icon size={20} />
      </span>

      <div className="notification-body">
        <p className="notification-title">{title}</p>
        <p className="notification-meta">
          {meta} · {time}
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;