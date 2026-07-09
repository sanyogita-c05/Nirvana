import MandalaPattern from "./MandalaPattern";

function FeaturesSection() {
  const features = [
    {
      badge: "Stock & Materials",
      title: "Inventory Management",
      desc: "Track every skein of yarn, candle wax batch, or clay block. Know exactly what you have, what is low, and when to restock.",
      icon: "🧶",
      tone: "orange",
    },
    {
      badge: "Orders & Fulfilment",
      title: "Order Tracking",
      desc: "Log custom orders from Instagram DMs, WhatsApp, or local markets. Track status from crafting to delivery in one clean view.",
      icon: "🛍",
      tone: "pink",
    },
    {
      badge: "Payments & Dues",
      title: "Payment Recording",
      desc: "Record UPI, cash, and bank transfers. Track advance payments and pending dues without losing payment history.",
      icon: "₹",
      tone: "blue",
    },
    {
      badge: "Analytics & Growth",
      title: "Business Insights",
      desc: "See which products sell best, track monthly revenue, and understand your craft business growth at a glance.",
      icon: "📊",
      tone: "purple",
    },
  ];

  return (
    <section className="features-section" id="features">
      <MandalaPattern className="section-pattern section-pattern-left" />

      <div className="container">
        <div className="section-heading">
          <span>EVERYTHING YOU NEED</span>
          <h2>Run your craft business with confidence</h2>
          <p>
            Designed specifically for handmade product sellers — not a generic
            tool adapted to fit.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className={`feature-icon ${feature.tone}`}>{feature.icon}</div>
              <div className={`feature-badge ${feature.tone}`}>{feature.badge}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;