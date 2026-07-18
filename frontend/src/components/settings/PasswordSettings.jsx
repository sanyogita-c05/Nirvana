import { useState } from "react";
import { changePassword } from "../../api/auth";

function PasswordSettings() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("New passwords do not match.");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await changePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword }, token);
      setSuccess("Password updated successfully.");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-card">

      <h3 className="settings-card-title">Change Password</h3>
      <p className="settings-card-subtitle">
        Choose a strong password you don't use elsewhere.
      </p>

      {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "8px" }}>{success}</p>}

      <form className="settings-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter current password"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="settings-form-actions">
          <button type="submit" className="save-changes-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

      </form>

    </div>
  );
}

export default PasswordSettings;