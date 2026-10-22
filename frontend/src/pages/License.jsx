import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLicenseStatus, activateLicense } from "../api/licenseApi";

// TODO: replace with the owner's real contact details
const CONTACT = {
  phone: "+91 00000 00000",
  email: "owner@example.com",
};

const STATE_INFO = {
  trial: {
    tone: "info",
    title: "Free trial active",
    text: "Your trial is running. You can enter a license key any time.",
  },
  licensed: {
    tone: "ok",
    title: "License active",
    text: "Your license is valid. You can enter a new key to renew early.",
  },
  grace: {
    tone: "warn",
    title: "License expired: grace period",
    text: "Your license has expired but you are in a short grace period. Please renew soon.",
  },
  trial_expired: {
    tone: "danger",
    title: "Your free trial has ended",
    text: "To keep using ArtisanSuite, get a license key from the owner and activate it below.",
  },
  license_expired: {
    tone: "danger",
    title: "Your license has expired",
    text: "Request a renewal key from the owner and activate it below.",
  },
  license_invalid: {
    tone: "danger",
    title: "License key is invalid",
    text: "The saved license could not be verified. Please activate a valid key.",
  },
  license_wrong_device: {
    tone: "danger",
    title: "License is for a different computer",
    text: "This key was issued for another device. Send your Device ID to the owner to get a key for this computer.",
  },
  license_not_yet_valid: {
    tone: "danger",
    title: "License is not valid yet",
    text: "This license starts at a later date. Check your computer's date and time, or contact the owner.",
  },
  clock_tampered: {
    tone: "danger",
    title: "System clock problem detected",
    text: "Your computer's date looks incorrect. Fix the date and time, then reload this page.",
  },
  verification_failed: {
    tone: "danger",
    title: "License check failed",
    text: "We could not verify your license. Please try again or contact the owner.",
  },
};

const CODE_TO_STATE = {
  TRIAL_EXPIRED: "trial_expired",
  LICENSE_EXPIRED: "license_expired",
  LICENSE_INVALID: "license_invalid",
  LICENSE_WRONG_DEVICE: "license_wrong_device",
  LICENSE_NOT_YET_VALID: "license_not_yet_valid",
  CLOCK_TAMPERED: "clock_tampered",
  LICENSE_VERIFICATION_FAILED: "verification_failed",
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

function License() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getLicenseStatus()
      .then((res) => setStatus(res.data.data))
      .catch(() => setLoadError("Could not reach the server. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  // Prefer the live status; fall back to the code that sent us here.
  let stateKey = status?.state;
  if (!stateKey) {
    try {
      const block = JSON.parse(sessionStorage.getItem("licenseBlock") || "null");
      stateKey = CODE_TO_STATE[block?.code];
    } catch {
      /* ignore */
    }
  }
  const info = STATE_INFO[stateKey];
  const deviceId = status?.deviceId || "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deviceId);
    } catch {
      const el = document.createElement("textarea");
      el.value = deviceId;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    const key = licenseKey.trim();
    if (!key) {
      setError("Please paste your license key.");
      return;
    }
    setError("");
    setActivating(true);
    try {
      await activateLicense(key);
      sessionStorage.removeItem("licenseBlock");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Activation failed. Please try again.");
    } finally {
      setActivating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="license-page">
      <div className="license-card">
        <div className="license-brand">✦ ArtisanSuite</div>

        {loading ? (
          <p className="license-muted">Checking license…</p>
        ) : (
          <>
            {loadError && <div className="license-alert danger">{loadError}</div>}

            {info && (
              <div className={`license-alert ${info.tone}`}>
                <h2>{info.title}</h2>
                <p>{info.text}</p>
                {status?.message && status.message !== info.text && (
                  <p className="license-muted">{status.message}</p>
                )}
              </div>
            )}

            {status && (
              <div className="license-facts">
                {status.state === "trial" && (
                  <div>
                    <span>Trial days left</span>
                    <strong>{status.trialDaysLeft}</strong>
                  </div>
                )}
                {status.validUntil && (
                  <div>
                    <span>Valid until</span>
                    <strong>{formatDate(status.validUntil)}</strong>
                  </div>
                )}
              </div>
            )}

            <div className="license-section">
              <h3>1. Send your Device ID to the owner</h3>
              <div className="license-device">
                <code>{deviceId || "Unavailable"}</code>
                <button
                  type="button"
                  className="license-btn-outline"
                  onClick={handleCopy}
                  disabled={!deviceId}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <p className="license-muted">
                Call or message: <strong>{CONTACT.phone}</strong> &middot;{" "}
                <strong>{CONTACT.email}</strong>
              </p>
            </div>

            <form className="license-section" onSubmit={handleActivate}>
              <h3>2. Paste your license key</h3>
              <textarea
                className="license-textarea"
                rows={5}
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="eyJ..."
                spellCheck={false}
              />
              {error && <p className="license-error">{error}</p>}
              <button type="submit" className="license-btn" disabled={activating}>
                {activating ? "Activating…" : "Activate"}
              </button>
            </form>

            <div className="license-footer">
              {status?.allowed && (
                <button
                  type="button"
                  className="license-btn-outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to dashboard
                </button>
              )}
              <button type="button" className="license-link" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default License;