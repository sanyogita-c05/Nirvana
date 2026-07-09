import MandalaPattern from "./MandalaPattern";

function CTASection() {
  return (
    <section className="cta-section">
      <MandalaPattern className="cta-pattern cta-left" />
      <MandalaPattern className="cta-pattern cta-right" />

      <div className="container">
        <div className="cta-card">
          <span>JOIN THE ARTISAN COMMUNITY</span>
          <h2>Start managing your craft business today</h2>
          <p>
            Join 12,000+ Indian artisans already using ArtisanSuite to grow
            their handmade businesses.
          </p>

          <div className="cta-actions">
            <button className="btn btn-yellow">Start for Free — No Card Needed</button>
            <button className="btn btn-light-outline">Schedule a Demo</button>
          </div>

          <small>Free plan available · No credit card required · Set up in 8 minutes</small>
        </div>
      </div>
    </section>
  );
}

export default CTASection;