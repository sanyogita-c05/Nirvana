function SetupSection() {
  const steps = [
    {
      no: "01",
      title: "Set Up Your Catalogue",
      desc: "Add your products, set prices, and define your material inventory. Takes under 10 minutes for most sellers.",
      color: "orange",
    },
    {
      no: "02",
      title: "Log Orders & Payments",
      desc: "Record custom orders from any channel — Instagram, WhatsApp, or walk-ins. Track payments as they come in.",
      color: "pink",
    },
    {
      no: "03",
      title: "Grow with Insights",
      desc: "Review weekly and monthly reports to understand what sells best and where your business is heading.",
      color: "purple",
    },
  ];

  return (
    <section className="setup-section">
      <div className="container">
        <div className="section-heading dark">
          <span>SIMPLE SETUP</span>
          <h2>Ready in minutes, not weeks</h2>
        </div>

        <div className="setup-grid">
          {steps.map((step, index) => (
            <div className="setup-card" key={index}>
              <div className={`step-badge ${step.color}`}>{step.no}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SetupSection;