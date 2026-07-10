function DashboardBanner() {
  return (
    <section className="dashboard-banner">
      <div className="dashboard-banner__content">
        <div className="dashboard-banner__left">
          <p className="dashboard-banner__greeting">Namaste,</p>
          <h1 className="dashboard-banner__title">Meera&apos;s Craft Studio ✦</h1>
          <p className="dashboard-banner__date">Thursday, 10 July 2026</p>

          <div className="dashboard-banner__actions">
            <button className="banner-btn banner-btn--primary">+ New Order</button>
            <button className="banner-btn banner-btn--secondary">+ Add Product</button>
            <button className="banner-btn banner-btn--secondary">View Reports</button>
          </div>
        </div>

        <div className="dashboard-banner__revenue">
          <p className="dashboard-banner__revenue-label">July revenue</p>
          <h2 className="dashboard-banner__revenue-value">₹38,400</h2>
          <span className="dashboard-banner__revenue-growth">↑ 43% vs June</span>
        </div>
      </div>
    </section>
  );
}

export default DashboardBanner;