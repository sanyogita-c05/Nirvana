import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashBoardLayout";

import OrderHero from "../components/orders/OrderHero";
import OrderStats from "../components/orders/OrderStats";
import OrderSearch from "../components/orders/OrderSearch";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import MobileOrderList from "../components/orders/MobileOrderList";
import CreateOrderModal from "../components/orders/CreateOrderModal";
import EditOrderModal from "../components/orders/EditOrderModal";
import EmptyOrders from "../components/orders/EmptyOrders";
import Pagination from "../components/orders/Pagination";
import { getOrders } from "../api/orderApi";

import "../styles/orders.css";

const PAGE_SIZE = 10;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [todayOnly, setTodayOnly] = useState(false);
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.data);
      console.log[0];
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (location.state?.openCreate) {
      setIsCreateOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, todayOnly]);

  const todayStr = new Date().toDateString();

  const filteredOrders = orders
    .filter((order) => {
      const matchesStatus = statusFilter === "All" || order.orderStatus === statusFilter;

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term === "" ||
        order.orderNumber?.toLowerCase().includes(term) ||
        order.customer?.name?.toLowerCase().includes(term) ||
        order.items?.some((item) => item.name?.toLowerCase().includes(term));

      const matchesToday =
        !todayOnly || new Date(order.orderDate).toDateString() === todayStr;

      return matchesStatus && matchesSearch && matchesToday;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.orderDate) - new Date(a.orderDate);
      if (sortBy === "date-asc") return new Date(a.orderDate) - new Date(b.orderDate);
      if (sortBy === "amount-desc") return b.totalAmount - a.totalAmount;
      if (sortBy === "amount-asc") return a.totalAmount - b.totalAmount;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleExport = () => {
    if (filteredOrders.length === 0) return;

    const headers = [
      "Order Number", "Customer Name", "Customer Email", "Customer Phone",
      "City", "Items", "Total Amount", "Payment Status", "Order Status", "Order Date",
    ];

    const rows = filteredOrders.map((o) => [
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
    link.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="orders-page">

        <OrderHero onNewOrder={() => setIsCreateOpen(true)} onExport={handleExport} orders={orders} />

        <OrderStats orders={orders} />

        <OrderSearch
          onNewOrder={() => setIsCreateOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          todayOnly={todayOnly}
          onToggleToday={() => setTodayOnly((prev) => !prev)}
          sortBy={sortBy}
          onCycleSort={setSortBy}
        />

        <OrderFilters orders={orders} active={statusFilter} onFilterChange={setStatusFilter} />

        {!loading && orders.length === 0 ? (
          <EmptyOrders onCreate={() => setIsCreateOpen(true)} />
        ) : (
          <>
            <div className="desktop-orders">
              <OrderTable
                orders={paginatedOrders}
                loading={loading}
                refreshOrders={fetchOrders}
                onEdit={setEditingOrder}
              />
            </div>

            <div className="mobile-orders">
              <MobileOrderList
                orders={paginatedOrders}
                refreshOrders={fetchOrders}
                onEdit={setEditingOrder}
              />
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}

        <CreateOrderModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} refreshOrders={fetchOrders} />

        {editingOrder && (
          <EditOrderModal order={editingOrder} onClose={() => setEditingOrder(null)} refreshOrders={fetchOrders} />
        )}

      </div>
    </DashboardLayout>
  );
}

export default Orders;

// import { useState, useEffect, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import DashboardLayout from "../components/layout/DashBoardLayout";

// import OrderHero from "../components/orders/OrderHero";
// import OrderStats from "../components/orders/OrderStats";
// import OrderSearch from "../components/orders/OrderSearch";
// import OrderFilters from "../components/orders/OrderFilters";
// import OrderTable from "../components/orders/OrderTable";
// import MobileOrderList from "../components/orders/MobileOrderList";
// import CreateOrderModal from "../components/orders/CreateOrderModal";
// import EditOrderModal from "../components/orders/EditOrderModal";
// import EmptyOrders from "../components/orders/EmptyOrders";
// import Pagination from "../components/orders/Pagination";
// import { getOrders } from "../api/orderApi";

// import "../styles/orders.css";

// const PAGE_SIZE = 10;

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [todayOnly, setTodayOnly] = useState(false);
//   const [sortBy, setSortBy] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);


//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchOrders = useCallback(async () => {
//     try {
//       const response = await getOrders();
//       setOrders(response.data.data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);


//   useEffect(() => {
//     if (location.state?.openCreate) {
//       setIsCreateOpen(true);
//       navigate(location.pathname, { replace: true, state: {} });
//     }
//   }, [location, navigate]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, todayOnly]);

//   const todayStr = new Date().toDateString();


//   const filteredOrders = orders
//     .filter((order) => {
//       const matchesStatus = statusFilter === "All" || order.orderStatus === statusFilter;

//       const term = searchTerm.trim().toLowerCase();
//       const matchesSearch =
//         term === "" ||
//         order.orderNumber?.toLowerCase().includes(term) ||
//         order.customer?.name?.toLowerCase().includes(term) ||
//         order.items?.some((item) => item.name?.toLowerCase().includes(term));

//       const matchesToday =
//         !todayOnly || new Date(order.orderDate).toDateString() === todayStr;

//       return matchesStatus && matchesSearch && matchesToday;
//     })
//     .sort((a, b) => {
//       if (sortBy === "date-desc") return new Date(b.orderDate) - new Date(a.orderDate);
//       if (sortBy === "date-asc") return new Date(a.orderDate) - new Date(b.orderDate);
//       if (sortBy === "amount-desc") return b.totalAmount - a.totalAmount;
//       if (sortBy === "amount-asc") return a.totalAmount - b.totalAmount;
//       return 0;
//     });
//   const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   const handleExport = () => {
//     if (filteredOrders.length === 0) return;

//     const headers = [
//       "Order Number", "Customer Name", "Customer Email", "Customer Phone",
//       "City", "Items", "Total Amount", "Payment Status", "Order Status", "Order Date",
//     ];


//     const rows = filteredOrders.map((o) => [
//       o.orderNumber,
//       o.customer?.name || "",
//       o.customer?.email || "",
//       o.customer?.phone || "",
//       o.customer?.city || "",
//       o.items?.map((i) => i.name).join(" | ") || "",
//       o.totalAmount,
//       o.payment?.status || "",
//       o.orderStatus,
//       new Date(o.orderDate).toLocaleDateString("en-IN"),
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <DashboardLayout>
//       <div className="orders-page">

//         <OrderHero onNewOrder={() => setIsCreateOpen(true)} onExport={handleExport} orders={orders} />

//         <OrderStats orders={orders} />

//         {/* <OrderSearch onNewOrder={() => setIsCreateOpen(true)} /> */}
//         <OrderSearch
//           onNewOrder={() => setIsCreateOpen(true)}
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           todayOnly={todayOnly}
//           onToggleToday={() => setTodayOnly((prev) => !prev)}
//           sortBy={sortBy}
//           onCycleSort={setSortBy}
//         />
//         {/* <OrderFilters orders={orders} /> */}

//         <OrderFilters orders={orders} active={statusFilter} onFilterChange={setStatusFilter} />

//         {/* Desktop & Tablet */}
//         <div className="desktop-orders">
//           <OrderTable
//             orders={filteredOrders}
//             loading={loading}
//             refreshOrders={fetchOrders}
//             onEdit={setEditingOrder}
//           />
//         </div>

//         {/* Mobile */}
//         <div className="mobile-orders">
//           <MobileOrderList
//             orders={filteredOrders}
//             refreshOrders={fetchOrders}
//             onEdit={setEditingOrder}
//           />
//         </div>

//         <CreateOrderModal
//           open={isCreateOpen}
//           onClose={() => setIsCreateOpen(false)}
//           refreshOrders={fetchOrders}
//         />

//         {editingOrder && (
//           <EditOrderModal
//             order={editingOrder}
//             onClose={() => setEditingOrder(null)}
//             refreshOrders={fetchOrders}
//           />
//         )}

//       </div>
//     </DashboardLayout>
//   );
// }

// export default Orders;