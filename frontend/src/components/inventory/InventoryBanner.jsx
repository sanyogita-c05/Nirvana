function InventoryBanner({ onExport }) {
  const scrollToTable = () => {
    document.getElementById("product-inventory-table")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="inventory-banner">

      <div className="inventory-banner-left">

        <p className="inventory-banner-tag">
          📦 Inventory Management
        </p>

        <h1>
          Manage Your
          <br />
          Craft Inventory
        </h1>

        <p className="inventory-banner-desc">
          Add new handcrafted products, update stock levels,
          organize categories, and keep your inventory synced
          with your business in one place.
        </p>

        <div className="inventory-banner-actions">
          <button className="primary-btn" onClick={scrollToTable}>
            View Inventory
          </button>

         <button className="secondary-btn" onClick={onExport}>
            Export Products
          </button>

        </div>

      </div>

      <div className="inventory-highlight-card">

        <span>Inventory Overview</span>

        <h2>📦</h2>

        <p>
          Easily monitor products, stock availability,
          categories, and business inventory from a
          single dashboard.
        </p>

      </div>

    </section>
  );
}

export default InventoryBanner;