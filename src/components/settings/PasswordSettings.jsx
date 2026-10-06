import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../api/auth";

function PasswordSettings() {

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await changePassword(
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        token
      );

      toast.success("Password updated successfully!");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update password."
      );
    }
    finally {
      // CHANGED: stop loading regardless of outcome
      setSaving(false);
    }
  };
  return (
    <div className="settings-card">

      <h3 className="settings-card-title">Change Password</h3>
      <p className="settings-card-subtitle">
        Choose a strong password you don't use elsewhere.
      </p>

      <form className="settings-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter current password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="settings-form-actions">
          <button type="submit" className="save-changes-btn" disabled={saving}>
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>

      </form>

    </div>
  );
}

export default PasswordSettings;