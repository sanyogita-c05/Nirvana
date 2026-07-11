import { useMemo, useState } from "react";
import CustomerTopbar from "../components/customer/CustomerTopbar";
import CustomerHero from "../components/customer/CustomerHero";
import CategoryChips from "../components/customer/CategoryChips";
import SearchSortBar from "../components/customer/SearchSortBar";
import ProductCard from "../components/customer/ProductCard";
import { products } from "../data/products";
import categories from "../data/categories";
import "../styles/customer.css";

function CustomerView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [activeCategory, searchTerm, sortBy]);

  return (
    <div className="customer-page">
      <div className="customer-shell">
        <CustomerTopbar />
        <CustomerHero />

        <section className="store-controls">
          <CategoryChips
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <SearchSortBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </section>

        <section className="store-section-header">
          <div>
            <p className="section-kicker">Customer Collection</p>
            <h2>Browse handmade picks</h2>
          </div>
          <span className="results-count">{filteredProducts.length} items</span>
        </section>

        <section className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try another category or search term.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CustomerView;