const notificationOptions = [
  { id: "orders", label: "New order alerts", description: "Get notified when a new order comes in." },
  { id: "stock", label: "Low stock alerts", description: "Get notified when a product is running low." },
  { id: "payments", label: "Payment updates", description: "Get notified about payment status changes." },
  { id: "marketing", label: "Product updates", description: "Occasional news about ArtisanSuite features." },
];

function NotificationSettings() {
  return (
    <div className="settings-card">

      <h3 className="settings-card-title">Notification Preferences</h3>
      <p className="settings-card-subtitle">
        Choose what you want to be notified about.
      </p>

      <div className="notification-list">
        {notificationOptions.map((item) => (
          <div className="notification-row" key={item.id}>

            <div>
              <p className="notification-label">{item.label}</p>
              <p className="notification-description">{item.description}</p>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked={item.id !== "marketing"} />
              <span className="switch-slider" />
            </label>

          </div>
        ))}
      </div>

      <div className="settings-form-actions">
        <button type="button" className="save-changes-btn">
          Save Preferences
        </button>
      </div>

    </div>
  );
}

export default NotificationSettings;