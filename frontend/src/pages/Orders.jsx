import { useState, useEffect, useCallback } from "react";

import DashboardLayout from "../components/layout/DashBoardLayout";

import OrderHero from "../components/orders/OrderHero";
import OrderStats from "../components/orders/OrderStats";
import OrderSearch from "../components/orders/OrderSearch";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import MobileOrderList from "../components/orders/MobileOrderList";
import CreateOrderModal from "../components/orders/CreateOrderModal";
import EditOrderModal from "../components/orders/EditOrderModal";
import { getOrders } from "../api/orderApi";

import "../styles/orders.css";

function Orders() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <DashboardLayout>
      <div className="orders-page">

        <OrderHero onNewOrder={() => setIsCreateOpen(true)}/>

        <OrderStats orders={orders} />

        <OrderSearch onNewOrder={() => setIsCreateOpen(true)} />

        <OrderFilters orders={orders} />

        {/* Desktop & Tablet */}
        <div className="desktop-orders">
          <OrderTable
            orders={orders}
            loading={loading}
            refreshOrders={fetchOrders}
            onEdit={setEditingOrder}
          />
        </div>

        {/* Mobile */}
        <div className="mobile-orders">
          <MobileOrderList
            orders={orders}
            refreshOrders={fetchOrders}
            onEdit={setEditingOrder}
          />
        </div>

        <CreateOrderModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          refreshOrders={fetchOrders}
        />

        {editingOrder && (
          <EditOrderModal
            order={editingOrder}
            onClose={() => setEditingOrder(null)}
            refreshOrders={fetchOrders}
          />
        )}

      </div>
    </DashboardLayout>
  );
}

export default Orders;