import { Camera, Trash2 } from "lucide-react";

function ProfileSettingsForm() {
  return (
    <div className="settings-card">

      <div className="profile-avatar-row">

        <div className="avatar-upload-wrap">
          <div className="avatar-circle">M</div>
          <button className="avatar-camera-btn">
            <Camera size={14} />
          </button>
        </div>

        <div className="avatar-actions">
          <button className="upload-btn">Upload New</button>
          <button className="delete-btn-outline">
            <Trash2 size={16} />
            Delete avatar
          </button>
        </div>

      </div>

      <form className="settings-form">

        <div className="settings-form-grid">

          <div className="form-group">
            <label>First Name *</label>
            <input type="text" placeholder="First name" />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input type="text" placeholder="Last name" />
          </div>

        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <input type="tel" placeholder="+91 123 456 7890" />
          </div>

        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-row">

            <label className="radio-option">
              <input type="radio" name="gender" value="male" />
              Male
            </label>

            <label className="radio-option">
              <input type="radio" name="gender" value="female" />
              Female
            </label>

          </div>
        </div>

        <div className="settings-form-grid">

          <div className="form-group">
            <label>Tax Identification Number</label>
            <input type="text" placeholder="example@gmail.com" />
          </div>

          <div className="form-group">
            <label>Tax Identification Country</label>
            <select>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Residential Address</label>
          <textarea rows="3" placeholder="Street, city, state" />
        </div>

        <div className="settings-form-actions">
          <button type="submit" className="save-changes-btn">
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
}

export default ProfileSettingsForm;