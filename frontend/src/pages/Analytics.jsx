import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashBoardLayout";
import AnalyticsBanner from "../components/analytics/Analyticsbanner";
import AnalyticsStatsGrid from "../components/analytics/AnalyticsStatsGrid";
import SalesChartCard from "../components/analytics/SalesChartCard";
import TrafficSourceCard from "../components/analytics/TrafficSourceCard";
import TopSellingProduct from "../components/analytics/TopSellingProduct";
import LeastOrderedProduct from "../components/analytics/LeastOrderedProduct";

import "../styles/analytics.css";

// ------------------------------------------
// Demo orders used for the CSV export.
// UI only — swap this out for a real API call
// once the backend is wired up.
// ------------------------------------------
const DEMO_ORDERS = [
  {
    orderNumber: "ORD-1001",
    customer: { name: "Aditi Sharma", email: "aditi@example.com", phone: "9876543210", city: "Pune" },
    items: [{ name: "Handmade Vase" }, { name: "Clay Pot" }],
    totalAmount: 2400,
    payment: { status: "Paid" },
    orderStatus: "Delivered",
    orderDate: "2026-07-12",
  },
  {
    orderNumber: "ORD-1002",
    customer: { name: "Rohan Mehta", email: "rohan@example.com", phone: "9812345678", city: "Mumbai" },
    items: [{ name: "Wooden Craft" }],
    totalAmount: 1200,
    payment: { status: "Paid" },
    orderStatus: "Shipped",
    orderDate: "2026-07-18",
  },
  {
    orderNumber: "ORD-1003",
    customer: { name: "Sneha Kulkarni", email: "sneha@example.com", phone: "9900112233", city: "Chākan" },
    items: [{ name: "Decor Basket" }, { name: "Wall Painting" }],
    totalAmount: 3100,
    payment: { status: "Pending" },
    orderStatus: "Processing",
    orderDate: "2026-08-02",
  },
];

function Analytics() {
  // ------------------------------------------
  // Export Orders / Analytics Report
  // Uses local demo data — no backend call
  // ------------------------------------------
  const handleExport = () => {
    const orders = DEMO_ORDERS;

    if (orders.length === 0) {
      alert("No orders available to export.");
      return;
    }

    const headers = [
      "Order Number",
      "Customer Name",
      "Customer Email",
      "Customer Phone",
      "City",
      "Items",
      "Total Amount",
      "Payment Status",
      "Order Status",
      "Order Date",
    ];

    const rows = orders.map((o) => [
      o.orderNumber || "",
      o.customer?.name || "",
      o.customer?.email || "",
      o.customer?.phone || "",
      o.customer?.city || "",
      o.items?.map((i) => i.name).join(" | ") || "",
      o.totalAmount || 0,
      o.payment?.status || "",
      o.orderStatus || "",
      o.orderDate
        ? new Date(o.orderDate).toLocaleDateString("en-IN")
        : "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-orders-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ------------------------------------------
  // View Report
  // ------------------------------------------
  const handleViewReport = () => {
    document
      .getElementById("analytics-stats-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <DashboardLayout>
      <div className="analytics-page">

        {/* =====================================
            Analytics Header / Banner
        ===================================== */}
        <AnalyticsBanner
          onExport={handleExport}
          onViewReport={handleViewReport}
        />

        {/* =====================================
            Analytics Statistics
        ===================================== */}
        <section
          id="analytics-stats-section"
          className="analytics-stats-section"
        >
          <AnalyticsStatsGrid />
        </section>

        {/* =====================================
            Main Analytics Charts
        ===================================== */}
        <section className="analytics-charts-section">

          <div className="analytics-section-heading">
            <div>
              <h2>Sales Overview</h2>
              <p>
                Monitor your orders, revenue and customer traffic.
              </p>
            </div>
          </div>

          <div className="analytics-charts-grid">

            {/* Orders & Revenue */}
            <div className="analytics-chart-large">
              <SalesChartCard />
            </div>

            {/* Traffic Sources */}
            <div className="analytics-chart-small">
              <TrafficSourceCard />
            </div>

          </div>
        </section>

        {/* =====================================
            Product Analytics
        ===================================== */}
        <section className="analytics-product-section">

          <div className="analytics-section-heading">
            <div>
              <h2>Product Performance</h2>
              <p>
                Understand which products are performing best.
              </p>
            </div>
          </div>

          <div className="analytics-product-grid">

            {/* Top Selling Products */}
            <div className="analytics-product-card">
              <TopSellingProduct />
            </div>

            {/* Least Ordered Products */}
            <div className="analytics-product-card">
              <LeastOrderedProduct />
            </div>

          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}

export default Analytics;