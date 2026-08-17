import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function DashboardBanner() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const [meRes, statsRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/dashboard/stats"),
        ]);

        setFullName(meRes.data.data.fullName); 
        setStudioName(meRes.data.data.studio);
        setRevenue(statsRes.data.data.revenue);

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard info.");
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();

  }, []);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentMonthName = today.toLocaleDateString("en-IN", { month: "long" });
  const lastMonthName = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  ).toLocaleDateString("en-IN", { month: "long" });

  return (

    <section className="dashboard-banner">
      <div className="dashboard-banner__content">
        <div className="dashboard-banner__left">
          <p className="dashboard-banner__greeting">Namaste,</p>
          {/* <h1 className="dashboard-banner__title">Meera&apos;s Craft Studio ✦</h1> */}
          {/* <p className="dashboard-banner__date">Thursday, 10 July 2026</p> */}
          <h1 className="dashboard-banner__title">
            {loading ? "..." : studioName || fullName || "there"} ✦
          </h1>
          <p className="dashboard-banner__date">{formattedDate}</p>

          <div className="dashboard-banner__actions">
            <button
              className="banner-btn banner-btn--primary"
              onClick={() => navigate("/orders", { state: { openCreate: true } })}
            >
              + New Order
            </button>
            <button
              className="banner-btn banner-btn--secondary"
              onClick={() => navigate("/inventory")}
            >
              + Add Product
            </button>
            <button
              className="banner-btn banner-btn--secondary"
              onClick={() => navigate("/analytics")}
            >
              View Reports
            </button>
          </div>
        </div>

        <div className="dashboard-banner__revenue">
          {/* <p className="dashboard-banner__revenue-label">July revenue</p> */}
          <p className="dashboard-banner__revenue-label">
            {loading ? "Loading..." : `${currentMonthName} revenue`}
          </p>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <h2 className="dashboard-banner__revenue-value">
                {loading ? "—" : `₹${revenue.thisMonth.toLocaleString("en-IN")}`} 
              </h2>
              {!loading && (
                <span className="dashboard-banner__revenue-growth">
                  {revenue.growth >= 0 ? "↑" : "↓"} {Math.abs(revenue.growth)}% vs {lastMonthName}
                </span>
              )}
            </>
          )}

        </div>
      </div>
    </section>
  );
}

export default DashboardBanner;