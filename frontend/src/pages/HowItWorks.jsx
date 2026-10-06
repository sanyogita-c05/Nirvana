import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/layout/BackButton";
import HowItWorksSection from "../components/home/HowItWorksSection";

import "../styles/landing-sections.css";

function HowItWorks() {
  return (
    <div className="how-page">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main>

        {/* Back Button */}
        <div className="container inner-page-top">
          <BackButton />
        </div>

        {/* How It Works Content */}
        <HowItWorksSection />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default HowItWorks;