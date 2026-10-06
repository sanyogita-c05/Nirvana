import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/layout/BackButton";
import ContactSection from "../components/home/ContactSection";

import "../styles/landing-sections.css";

function Contact() {
  return (
    <div className="contact-page">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main>

        {/* Back Button */}
        <div className="container inner-page-top">
          <BackButton />
        </div>

        {/* Contact Content */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Contact;