import {
  FiMail,
  FiGlobe,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";

const CONTACT_DETAILS = [
  {
    icon: <FiMail size={20} />,
    label: "Email",
    value: "nirvana.acad@gmail.com",
    href: "mailto:nirvana.acad@gmail.com",
  },
  {
    icon: <FiGlobe size={20} />,
    label: "Website",
    value: "Nirvana Elevate",
    href: "https://sites.google.com/view/nirvanaelevate",
  },
  {
    icon: <FiLinkedin size={20} />,
    label: "LinkedIn",
    value: "Nirvana Transformation Academy",
    href: "https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all",
  },
  {
    icon: <FiYoutube size={20} />,
    label: "YouTube",
    value: "Nirvana Speaks",
    href: "https://www.youtube.com/@nirvanaSpeaks_Elevate",
  },
];

function ContactSection() {
  return (
    <section className="landing-section contact-section">
      <div className="container">

        <div className="landing-heading">
          <span className="landing-tag">Contact</span>

          <h2>
            Questions? <em>Let's talk.</em>
          </h2>

          <p>
            Have a question or want to know more about Nirvana Elevate?
            Get in touch with us through any of the channels below.
          </p>
        </div>

        <div className="contact-grid">

          {/* Contact Details */}
          <div className="contact-info">
            {CONTACT_DETAILS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  item.href.startsWith("mailto:")
                    ? undefined
                    : "noreferrer"
                }
                className="contact-item"
              >
                <span className="contact-icon">
                  {item.icon}
                </span>

                <div>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </div>
              </a>
            ))}
          </div>

          {/* Connect */}
          <div className="contact-form">
            <div className="contact-message">
              <h3>Connect with Nirvana Elevate</h3>

              <p>
                We'd love to hear from you. Whether you have a question,
                want to collaborate, or simply want to learn more, reach
                out to us through email or connect with us on our social
                platforms.
              </p>

              <div className="contact-social-links">

                <a
                  href="https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <FiLinkedin size={20} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://www.youtube.com/@nirvanaSpeaks_Elevate"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <FiYoutube size={20} />
                  <span>YouTube</span>
                </a>

                <a
                  href="mailto:nirvana.acad@gmail.com"
                  className="contact-social-link"
                >
                  <FiMail size={20} />
                  <span>Send us an Email</span>
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