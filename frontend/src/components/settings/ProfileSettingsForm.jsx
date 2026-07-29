import { useState, useEffect } from "react";
import { Camera, Trash2 } from "lucide-react";
import { getMe, updateProfile } from "../../api/auth";

function ProfileSettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    taxIdNumber: "",
    taxIdCountry: "India",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getMe(token);
        const user = res.data.data;

        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "",
          taxIdNumber: user.taxIdNumber || "",
          taxIdCountry: user.taxIdCountry || "India",
          address: user.address || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Could not load your profile. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      // Built explicitly (not by destructuring form and excluding
      // email/phone) so it's clear exactly what's sent, and so the
      // linter doesn't flag unused destructured vars.
      const editableFields = {
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        taxIdNumber: form.taxIdNumber,
        taxIdCountry: form.taxIdCountry,
        address: form.address,
      };

      await updateProfile(editableFields, token);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="settings-card">Loading...</div>;
  }

  return (
    <div className="settings-card">

      <div className="profile-avatar-row">

        <div className="avatar-upload-wrap">
          <div className="avatar-circle">
            {form.firstName?.charAt(0).toUpperCase() || "U"}
          </div>
          <button type="button" className="avatar-camera-btn">
            <Camera size={14} />
          </button>
        </div>

        <div className="avatar-actions">
          <button type="button" className="upload-btn">Upload New</button>
          <button type="button" className="delete-btn-outline">
            <Trash2 size={16} />
            Delete avatar
          </button>
        </div>

      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <form className="settings-form" onSubmit={handleSubmit}>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              title="Email can't be changed here"
            />
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <input
              type="tel"
              value={form.phone}
              disabled
              title="Mobile number can't be changed here"
            />
          </div>

        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-row">

            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>

          </div>
        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>Tax Identification Number</label>
            <input
              type="text"
              name="taxIdNumber"
              placeholder="e.g. 29ABCDE1234F1Z5"
              value={form.taxIdNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tax Identification Country</label>
            <select
              name="taxIdCountry"
              value={form.taxIdCountry}
              onChange={handleChange}
            >
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Residential Address</label>
          <textarea
            rows="3"
            name="address"
            placeholder="Street, city, state"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="settings-form-actions">
          <button type="submit" className="save-changes-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>

    </div>
  );
}

export default ProfileSettingsForm;
