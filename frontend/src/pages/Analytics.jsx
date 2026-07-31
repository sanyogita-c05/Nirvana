import DashboardLayout from "../components/layout/DashBoardLayout";

import AnalyticsBanner from "../components/analytics/Analyticsbanner";
import AnalyticsStatsGrid from "../components/analytics/AnalyticsStatsGrid";
import SalesChartCard from "../components/analytics/SalesChartCard";
import TrafficSourceCard from "../components/analytics/TrafficSourceCard";
import { getOrders } from "../api/orderApi";

import "../styles/analytics.css";

function Analytics() {

  const handleExport = async () => {
    try {
      const response = await getOrders();
      const orders = response.data.data;

      if (orders.length === 0) return;

      const headers = [
        "Order Number", "Customer Name", "Customer Email", "Customer Phone",
        "City", "Items", "Total Amount", "Payment Status", "Order Status", "Order Date",
      ];

      const rows = orders.map((o) => [
        o.orderNumber,
        o.customer?.name || "",
        o.customer?.email || "",
        o.customer?.phone || "",
        o.customer?.city || "",
        o.items?.map((i) => i.name).join(" | ") || "",
        o.totalAmount,
        o.payment?.status || "",
        o.orderStatus,
        new Date(o.orderDate).toLocaleDateString("en-IN"),
      ]);

      const csvContent = [headers, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `analytics-orders-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export orders:", error);
    }
  };

  const handleViewReport = () => {
    document.getElementById("analytics-stats-section")?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <DashboardLayout>
      <div className="analytics-page">

        <AnalyticsBanner onExport={handleExport} onViewReport={handleViewReport} />


        <div id="analytics-stats-section">
          <AnalyticsStatsGrid />
        </div>

        <div className="analytics-charts-grid">
          <SalesChartCard />
          <TrafficSourceCard />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Analytics;