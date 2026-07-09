function DashboardPreview() {
  return (
    <section className="dashboard-preview" id="dashboard">
      <div className="container dashboard-preview-grid">
        <div className="dashboard-copy">
          <span>DASHBOARD PREVIEW</span>
          <h2>Everything visible, nothing slips through</h2>
          <p>
            Your daily summary at a glance — revenue, pending orders,
            inventory alerts, and payment dues — all from one warm,
            easy-to-read dashboard built for your craft studio.
          </p>

          <div className="preview-list">
            <div className="preview-item">
              <h4>📦 Smart Inventory Alerts</h4>
              <p>Get notified when materials drop below your set threshold.</p>
            </div>

            <div className="preview-item">
              <h4>💬 Order Notes & References</h4>
              <p>Store customer preferences, design references, and delivery deadlines.</p>
            </div>

            <div className="preview-item">
              <h4>📱 Mobile-First Design</h4>
              <p>Manage your business from the craft table, market stall, or anywhere.</p>
            </div>
          </div>
        </div>

        <div className="preview-chart-card">
          <div className="window-top">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="window-url">artisansuite.in/insights</div>
          </div>

          <div className="chart-content">
            <div className="chart-head">
              <div>
                <p>Monthly Revenue</p>
                <h3>₹28,400</h3>
              </div>
              <span className="growth-pill">↗ 12% this month</span>
            </div>

            <div className="bar-chart">
              <div className="bar small"></div>
              <div className="bar xs"></div>
              <div className="bar md"></div>
              <div className="bar sm"></div>
              <div className="bar lg"></div>
              <div className="bar md"></div>
              <div className="bar lg"></div>
              <div className="bar sm"></div>
              <div className="bar xl active"></div>
            </div>

            <div className="mini-metrics">
              <div className="mini-card pink">
                <strong>47</strong>
                <span>Orders</span>
              </div>
              <div className="mini-card peach">
                <strong>23</strong>
                <span>Products</span>
              </div>
              <div className="mini-card purple">
                <strong>38</strong>
                <span>Customers</span>
              </div>
            </div>

            <div className="top-products">
              <h4>Top Products This Month</h4>

              <div className="product-line">
                <span>Macramé Wall Hanging</span>
                <span>18 sold</span>
              </div>
              <div className="progress pink"></div>

              <div className="product-line">
                <span>Soy Candle — Rose</span>
                <span>14 sold</span>
              </div>
              <div className="progress orange w85"></div>

              <div className="product-line">
                <span>Embroidered Tote Bag</span>
                <span>11 sold</span>
              </div>
              <div className="progress purple w70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;