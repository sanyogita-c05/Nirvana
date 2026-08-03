import { Link } from "react-router-dom";
import MandalaPattern from "./MandalaPattern";

function HeroSection() {

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section">
      <MandalaPattern className="hero-pattern hero-pattern-left" />
      <MandalaPattern className="hero-pattern hero-pattern-right" />

      <div className="container hero-grid">
        <div className="hero-left">
          <div className="hero-badge">🌸 Built for Indian artisans & creators</div>

          <h1 className="hero-title">
            Your Craft. <span>Your</span>
            <br />
            <span>Business.</span>
            <br />
            <em>Your Way.</em>
          </h1>

          <p className="hero-subtitle">
            The all-in-one business tool for Indian handmade sellers.
            Manage inventory, track custom orders, record payments,
            and grow your craft business — from your phone or laptop.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary large">
              Start for Free →
            </Link>
            <button className="btn btn-outline large" onClick={scrollToHowItWorks}>
              See How It Works →
            </button>
            {/* <button className="btn btn-primary large">Start for Free →</button>
            <button className="btn btn-outline large">See How It Works →</button> */}
          </div>

          <div className="hero-points">
            <span>✔ Free to start, no credit card</span>
            <span>✔ Works on mobile & desktop</span>
            <span>✔ Supports UPI & cash</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="dashboard-window">
            <div className="window-top">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="window-url">artisansuite.in/dashboard</div>
              <div className="window-bell">⌂</div>
            </div>

            <div className="window-body">
              <aside className="sidebar">
                <h3>ArtisanSuite</h3>
                <p>Priya’s Studio</p>

                <ul>
                  <li className="active">📊 Overview</li>
                  <li>📦 Inventory</li>
                  <li>🛍 Orders</li>
                  <li>💳 Payments</li>
                  <li>📈 Insights</li>
                </ul>
              </aside>

              <div className="dashboard-main">
                <div className="dashboard-header">
                  <div>
                    <p>Welcome back 🌸</p>
                    <h3>Priya’s Craft Studio</h3>
                  </div>
                  <div className="profile-badge">PS</div>
                </div>

                <div className="metric-grid">
                  <div className="metric-card pink">
                    <h4>Revenue</h4>
                    <p>₹28,400</p>
                    <span>↑ 12% this month</span>
                  </div>

                  <div className="metric-card peach">
                    <h4>Pending Orders</h4>
                    <p>14</p>
                    <span>3 urgent today</span>
                  </div>

                  <div className="metric-card cream">
                    <h4>Low Stock</h4>
                    <p>6 items</p>
                    <span>Needs reorder</span>
                  </div>

                  <div className="metric-card blue">
                    <h4>Dues Pending</h4>
                    <p>₹4,200</p>
                    <span>5 customers</span>
                  </div>
                </div>

                <div className="recent-orders">
                  <h4>Recent Orders</h4>

                  <div className="order-row">
                    <div>
                      <strong>Anjali M.</strong>
                      <p>Crochet bag set ×2</p>
                    </div>
                    <div className="order-right">
                      <strong>₹1,200</strong>
                      <span className="tag crafting">Crafting</span>
                    </div>
                  </div>

                  <div className="order-row">
                    <div>
                      <strong>Ritu S.</strong>
                      <p>Soy candles ×4</p>
                    </div>
                    <div className="order-right">
                      <strong>₹800</strong>
                      <span className="tag shipped">Shipped</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;