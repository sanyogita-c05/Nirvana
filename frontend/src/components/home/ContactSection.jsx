import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
} from "react-icons/fi";

function ContactSection() {
  return (
    <section className="landing-section contact-section">
      <div className="container">

        {/* Heading */}
        <div className="landing-heading contact-heading">
          <h2>
            Let’s build something{" "}
            <em>beautiful</em>
            <br />
            together.
          </h2>

          <p>
            Have a question, need help setting up your studio,
            or simply want to say hello? We’d love to hear from you.
          </p>
        </div>


        {/* Contact Content */}
        <div className="contact-grid">

          {/* Left - Contact Information */}
          <div className="contact-info">

            <a
              href="mailto:hello@artisansuite.com"
              className="contact-item"
            >
              <span className="contact-icon">
                <FiMail size={21} />
              </span>

              <span>
                <small>Email</small>
                <strong>hello@artisansuite.com</strong>
              </span>
            </a>


            <a
              href="tel:+919876543210"
              className="contact-item"
            >
              <span className="contact-icon">
                <FiPhone size={21} />
              </span>

              <span>
                <small>Phone</small>
                <strong>+91 98765 43210</strong>
              </span>
            </a>


            <div className="contact-item">
              <span className="contact-icon">
                <FiMapPin size={21} />
              </span>

              <span>
                <small>Location</small>
                <strong>India</strong>
              </span>
            </div>


            <div className="contact-item">
              <span className="contact-icon">
                <FiMessageCircle size={21} />
              </span>

              <span>
                <small>Support</small>
                <strong>We’re here to help</strong>
              </span>
            </div>

          </div>


          {/* Right - Message */}
          <div className="contact-form">

            <div className="contact-message">

              <h3>
                We’d love to hear from you.
              </h3>

              <p>
                Whether you're a handmade seller getting started,
                already running your studio, or just curious about
                ArtisanSuite, feel free to reach out.
              </p>


              {/* Social Links */}
              <div className="contact-social-links">

                <a
                  href="#"
                  className="contact-social-link"
                >
                  <FiInstagram size={18} />
                  Instagram
                </a>


                <a
                  href="#"
                  className="contact-social-link"
                >
                  <FiFacebook size={18} />
                  Facebook
                </a>


                <a
                  href="mailto:hello@artisansuite.com"
                  className="contact-social-link"
                >
                  <FiMail size={18} />
                  Email Us
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