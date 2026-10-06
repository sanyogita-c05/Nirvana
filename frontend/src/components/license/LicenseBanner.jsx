import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLicenseStatus } from "../../api/licenseApi";

const DAY = 24 * 60 * 60 * 1000;

function LicenseBanner() {
  const [status, setStatus] = useState(null);
  const [dismissed, setDismissed] = useState(
    sessionStorage.getItem("licenseBannerDismissed") === "1"
  );

  useEffect(() => {
    getLicenseStatus()
      .then((res) => setStatus(res.data.data))
      .catch(() => {});
  }, []);

  if (!status || !status.allowed || dismissed) return null;

  const daysToExpiry = status.validUntil
    ? Math.ceil((new Date(status.validUntil) - Date.now()) / DAY)
    : null;

  let message = null;
  let tone = "warn";

  if (status.state === "grace") {
    message = "Your license has expired. You are in a grace period. Renew now to avoid being locked out.";
    tone = "danger";
  } else if (status.state === "trial" && status.trialDaysLeft <= 7) {
    message = `Your free trial ends in ${status.trialDaysLeft} day${
      status.trialDaysLeft === 1 ? "" : "s"
    }. Get a license key to keep using ArtisanSuite.`;
  } else if (status.state === "licensed" && daysToExpiry !== null && daysToExpiry <= 7) {
    message = `Your license expires in ${Math.max(daysToExpiry, 0)} day${
      daysToExpiry === 1 ? "" : "s"
    }. Contact the owner to renew.`;
  }

  if (!message) return null;

  const dismiss = () => {
    sessionStorage.setItem("licenseBannerDismissed", "1");
    setDismissed(true);
  };

  return (
    <div className={`license-banner ${tone}`}>
      <span>{message}</span>
      <div className="license-banner-actions">
        <Link to="/license">Enter license key</Link>
        {tone !== "danger" && (
          <button type="button" onClick={dismiss} aria-label="Dismiss">
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default LicenseBanner;