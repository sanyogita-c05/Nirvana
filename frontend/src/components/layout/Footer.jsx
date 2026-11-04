function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-icon">🪷</div>
            <span className="brand-text">
              Nirvana<span> Impact Partners</span>
            </span>
          </div>

          <p>
            Nirvana Impact Partners™ is a Boutique Consulting Brand enabling meaningful transformation for leaders & organizations
          </p>

          <small>Transforming potential into progress.</small>
        </div>

        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Contact</a>
          </div>

          <div>
            <h4>Connect</h4>
            <a href="mailto:nirvana.acad@gmail.com">nirvana.acad@gmail.com</a>
            <a
              href="https://sites.google.com/view/nirvanaelevate"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
            <a
              href="https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@nirvanaSpeaks_Elevate"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © 2026 Nirvana Impact Partners. All rights reserved. Built to inspire growth,
          learning, and transformation.
        </p>

        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.youtube.com/@nirvanaSpeaks_Elevate"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <a href="mailto:nirvana.acad@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;