import DashboardLayout from "../components/layout/DashBoardLayout";

import OrderHero from "../components/orders/OrderHero";
import OrderStats from "../components/orders/OrderStats";
import OrderSearch from "../components/orders/OrderSearch";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import MobileOrderList from "../components/orders/MobileOrderList";
import CreateOrderModal from "../components/orders/CreateOrderModal";

import "../styles/orders.css";

function Orders() {
  return (
    <DashboardLayout>
      <div className="orders-page">

        <OrderHero />

        <OrderStats />

        <OrderSearch />

        <OrderFilters />

        {/* Desktop & Tablet */}
        <div className="desktop-orders">
          <OrderTable />
        </div>

        {/* Mobile */}
        <div className="mobile-orders">
          <MobileOrderList />
        </div>

        <CreateOrderModal />

      </div>
    </DashboardLayout>
  );
}

export default Orders;