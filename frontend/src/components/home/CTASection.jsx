import { Link } from "react-router-dom";
import MandalaPattern from "./MandalaPattern";

function CTASection() {
  return (
    <section className="cta-section">
      <MandalaPattern className="cta-pattern cta-left" />
      <MandalaPattern className="cta-pattern cta-right" />

      <div className="container">
        <div className="cta-card">
          <span>JOIN NIRVANA ELEVATE</span>
          <h2>Start your journey with ArtisanSuite today</h2>
          <p>
            Explore opportunities, build practical skills, and grow with a
            platform designed to support learning, transformation, and career
            development.
          </p>

          <div className="cta-actions">
            <Link to="/login" className="btn btn-yellow">
              Get Started
            </Link>

            <a
              href="https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light-outline"
            >
              Connect With Us
            </a>
          </div>

          <small>
            Built to support growth, learning, and meaningful opportunities
          </small>
        </div>
      </div>
    </section>
  );
}

export default CTASection;