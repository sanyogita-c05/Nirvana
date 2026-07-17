import DashboardLayout from "../components/layout/DashboardLayout";

import AnalyticsBanner from "../components/analytics/AnalyticsBanner";
import AnalyticsStatsGrid from "../components/analytics/AnalyticsStatsGrid";
import SalesChartCard from "../components/analytics/SalesChartCard";
import TrafficSourceCard from "../components/analytics/TrafficSourceCard";

import "../styles/analytics.css";

function Analytics() {
  return (
    <DashboardLayout>
      <div className="analytics-page">

        <AnalyticsBanner />

        <AnalyticsStatsGrid />

        <div className="analytics-charts-grid">
          <SalesChartCard />
          <TrafficSourceCard />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Analytics;