import { useEffect, useState } from "react";
import api from "../../api/api";
import SectionCard from "./SectionCard";

function RevenueChartCard() {

  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await api.get("/dashboard/revenue-chart");
        setPoints(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load revenue chart.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);
  
  if (loading) {
    return (
      <SectionCard title="Revenue Overview" action="Jan–Jul 2026" className="revenue-card">
        <p>Loading chart...</p>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Revenue Overview" action="Jan–Jul 2026" className="revenue-card">
        <p>{error}</p>
      </SectionCard>
    );
  }

  const max = Math.max(...points.map((p) => p.value), 1);
  
  return (
    <SectionCard title="Revenue Overview" action="Jan–Jul 2026" className="revenue-card">
      <div className="revenue-chart">
        <div className="revenue-bars">
          {points.map((point) => (
            <div key={point.month} className="revenue-bar-item">
              <div className="revenue-bar-track">
                <div
                  className="revenue-bar-fill"
                  style={{ height: `${(point.value / max) * 100}%` }}
                />
              </div>
              <span className="revenue-bar-label">{point.month}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export default RevenueChartCard;