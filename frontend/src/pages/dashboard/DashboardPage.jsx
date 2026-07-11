import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardBanner from "../../components/dashboard/DashboardBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RevenueChartCard from "../../components/dashboard/RevenueChartCard";
import LowStockCard from "../../components/dashboard/LowStockCard";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import TopSellingProducts from "../../components/dashboard/TopSellingProducts";

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <DashboardBanner />
        <StatsGrid />

        <div className="dashboard-main-grid">
          <RevenueChartCard />
          <LowStockCard />
        </div>

        <RecentOrdersTable />
        <TopSellingProducts />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;