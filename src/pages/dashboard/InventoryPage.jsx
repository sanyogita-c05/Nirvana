import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

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

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout>
      <div className="inventory-page">
        <InventoryBanner />

        <InventoryStatsGrid products={products} />

        <SearchBar />

        <CategoryFilter products={products} />

        <ProductInventoryTable
          products={products}
          loading={loading}
          refreshProducts={fetchProducts}
        />

        <div className="inventory-bottom-grid">
          <RecentlyAddedCard products={products} />
          <StockAlertsCard products={products} />
        </div>

        <div className="inventory-bottom-grid">
          <TopSellingCard />
          <RecentActivityCard />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InventoryPage;