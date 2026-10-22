import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLicenseStatus } from "../../api/licenseApi";

const STATE_LABELS = {
  trial: "Free trial",
  licensed: "Licensed",
  grace: "Grace period",
  trial_expired: "Trial expired",
  license_expired: "License expired",
  license_invalid: "License invalid",
  license_wrong_device: "Wrong device",
  license_not_yet_valid: "Not yet valid",
  clock_tampered: "Clock problem",
  verification_failed: "Verification failed",
};

function LicenseSettings() {
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getLicenseStatus()
      .then((res) => setStatus(res.data.data))
      .catch(() => {});
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(status.deviceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const validUntil = status?.validUntil
    ? new Date(status.validUntil).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="settings-card">
      <h2 className="settings-card-title">License</h2>
      <p className="settings-card-subtitle">
        Your current license status and this computer's Device ID.
      </p>

      {!status ? (
        <p className="license-muted">Loading…</p>
      ) : (
        <div className="license-settings-list">
          <div className="license-settings-row">
            <span>Status</span>
            <strong>{STATE_LABELS[status.state] || status.state}</strong>
          </div>

          {status.state === "trial" && (
            <div className="license-settings-row">
              <span>Trial days left</span>
              <strong>{status.trialDaysLeft}</strong>
            </div>
          )}

          <div className="license-settings-row">
            <span>Valid until</span>
            <strong>{validUntil}</strong>
          </div>

          <div className="license-settings-row">
            <span>Device ID</span>
            <div className="license-device">
              <code>{status.deviceId}</code>
              <button type="button" className="license-btn-outline" onClick={copy}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="settings-form-actions">
        <Link to="/license" className="save-changes-btn license-settings-link">
          Enter / renew license key
        </Link>
      </div>
    </div>
  );
}

export default LicenseSettings;