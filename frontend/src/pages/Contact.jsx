import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/layout/BackButton";
import ContactSection from "../components/home/ContactSection";

import "../styles/landing-sections.css";

function Contact() {
  return (
    <div className="contact-page">
      <Navbar />

      <main className="subpage-main">
        <div className="container back-button-container">
          <BackButton />
        </div>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default Contact;