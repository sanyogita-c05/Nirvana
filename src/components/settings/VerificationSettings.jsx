import { ShieldCheck, Upload } from "lucide-react";

function VerificationSettings() {
  return (
    <div className="settings-card">

      <h3 className="settings-card-title">Identity Verification</h3>
      <p className="settings-card-subtitle">
        Verify your identity to unlock higher payout limits.
      </p>

      <div className="verification-status">
        <ShieldCheck size={20} />
        <span>Not yet verified</span>
      </div>

      <div className="settings-form-grid">

        <div className="form-group">
          <label>Government ID Type</label>
          <select>
            <option>Aadhaar Card</option>
            <option>PAN Card</option>
            <option>Passport</option>
          </select>
        </div>

        <div className="form-group">
          <label>ID Number</label>
          <input type="text" placeholder="Enter ID number" />
        </div>

      </div>

      <div className="form-group">
        <label>Upload Document</label>
        <button type="button" className="upload-btn upload-doc-btn">
          <Upload size={16} />
          Choose File
        </button>
      </div>

      <div className="settings-form-actions">
        <button type="submit" className="save-changes-btn">
          Submit for Verification
        </button>
      </div>

    </div>
  );
}

export default VerificationSettings;