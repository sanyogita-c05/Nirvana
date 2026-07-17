function PasswordSettings() {
  return (
    <div className="settings-card">

      <h3 className="settings-card-title">Change Password</h3>
      <p className="settings-card-subtitle">
        Choose a strong password you don't use elsewhere.
      </p>

      <form className="settings-form">

        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />
        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" placeholder="Re-enter new password" />
          </div>

        </div>

        <div className="settings-form-actions">
          <button type="submit" className="save-changes-btn">
            Update Password
          </button>
        </div>

      </form>

    </div>
  );
}

export default PasswordSettings;