import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/layout/DashBoardLayout";

import InventoryBanner from "../../components/inventory/InventoryBanner";
import InventoryStatsGrid from "../../components/inventory/InventoryStatsGrid";
import SearchBar from "../../components/inventory/SearchBar";
import CategoryFilter from "../../components/inventory/CategoryFilter";
import ProductInventoryTable from "../../components/inventory/ProductInventoryTable";
import RecentlyAddedCard from "../../components/inventory/RecentlyAddedCard";
import StockAlertsCard from "../../components/inventory/StockAlertsCard";
import TopSellingCard from "../../components/inventory/TopSellingCard";
import RecentActivityCard from "../../components/inventory/RecentActivityCard";

import { getProducts } from "../../api/productApi";
import { getOrders } from "../../api/orderApi";

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");


  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);


  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      term === "" ||
      product.name?.toLowerCase().includes(term) ||
      product.sku?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  const handleExport = () => {
    if (products.length === 0) return;

    const headers = ["SKU", "Name", "Category", "Cost Price", "Selling Price", "Stock Quantity", "Status"];
    const rows = products.map((p) => [
      p.sku,
      p.name,
      p.category,
      p.costPrice,
      p.sellingPrice,
      p.stockQuantity,
      p.stockQuantity === 0 ? "Out of Stock" : p.stockQuantity <= 5 ? "Low Stock" : "In Stock",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `products-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };


  return (
    <DashboardLayout>
      <div className="inventory-page">
        <InventoryBanner onExport={handleExport} />

        <InventoryStatsGrid products={products} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />


        <CategoryFilter
          products={products}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* <ProductInventoryTable
          products={products}
          loading={loading}
          refreshProducts={fetchProducts}
        /> */}
        <div id="product-inventory-table">
          <ProductInventoryTable
            products={filteredProducts}
            loading={loading}
            refreshProducts={fetchProducts}
          />
        </div>

        {/* <div className="inventory-bottom-grid">
          <RecentlyAddedCard products={products} />
          <StockAlertsCard products={products} />
        </div> */}

        <div className="inventory-bottom-grid">
          <RecentlyAddedCard products={products} />
          <StockAlertsCard products={products} refreshProducts={fetchProducts} />
        </div>



        {/* <div className="inventory-bottom-grid">
          <TopSellingCard />
          <RecentActivityCard />
        </div> */}
        <div className="inventory-bottom-grid">
          <TopSellingCard />
          <RecentActivityCard products={products} orders={orders} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InventoryPage;