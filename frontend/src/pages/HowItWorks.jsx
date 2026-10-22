
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/layout/BackButton";
import HowItWorksSection from "../components/home/HowItWorksSection";

import "../styles/landing-sections.css";

function HowItWorks() {
  return (
    <div className="how-page">
      <Navbar />

      <main className="subpage-main">
        <div className="container back-button-container">
          <BackButton />
        </div>

        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
}

export default HowItWorks;
