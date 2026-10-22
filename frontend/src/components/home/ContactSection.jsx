
import {
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiYoutube,
  FiGlobe,
} from "react-icons/fi";

function ContactSection() {
  return (
    <section className="landing-section contact-section">
      <div className="container">

        {/* Heading */}
        <div className="landing-heading contact-heading">
          <h2>
            Let’s grow something{" "}
            <em>meaningful</em>
            <br />
            together.
          </h2>

          <p>
            Have a question, want to explore our programs, or
            simply want to connect? We’d love to hear from you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-grid">

          {/* Left - Contact Information */}
          <div className="contact-info">

            {/* Email */}
            <a
              href="mailto:nirvana.acad@gmail.com"
              className="contact-item"
            >
              <span className="contact-icon">
                <FiMail size={21} />
              </span>

              <span>
                <small>Email</small>
                <strong>nirvana.acad@gmail.com</strong>
              </span>
            </a>

            {/* Location */}
            <div className="contact-item">
              <span className="contact-icon">
                <FiMapPin size={21} />
              </span>

              <span>
                <small>Location</small>
                <strong>Pune, Maharashtra, India</strong>
              </span>
            </div>

            {/* Website */}
            <a
              href="https://sites.google.com/view/nirvanaelevate"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <span className="contact-icon">
                <FiGlobe size={21} />
              </span>

              <span>
                <small>Website</small>
                <strong>Nirvana Elevate</strong>
              </span>
            </a>

            {/* Support */}
            <div className="contact-item">
              <span className="contact-icon">
                <FiMail size={21} />
              </span>

              <span>
                <small>Support</small>
                <strong>We're here to help</strong>
              </span>
            </div>

          </div>

          {/* Right - Message */}
          <div className="contact-form">
            <div className="contact-message">

              <h3>
                Your growth journey starts here.
              </h3>

              <p>
                At Nirvana Elevate, we believe in transforming
                potential into progress through learning,
                personal growth, and meaningful opportunities.
                Whether you're a student, aspiring professional,
                or simply curious about what we do, feel free
                to reach out.
              </p>

              {/* Social Links */}
              <div className="contact-social-links">

                <a
                  href="https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <FiLinkedin size={18} />
                  LinkedIn
                </a>

                <a
                  href="https://www.youtube.com/@nirvanaSpeaks_Elevate"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <FiYoutube size={18} />
                  YouTube
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
