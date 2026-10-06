import Navbar from "../components/layout/Navbar";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/layout/Footer";

import "../styles/landing-sections.css";

function Contact() {
  return (
    <div className="min-h-screen bg-[#FBF4EA] text-[#3B241A]">
      <Navbar />

      <ContactSection />

      <Footer />
    </div>
  );
}

export default Contact;