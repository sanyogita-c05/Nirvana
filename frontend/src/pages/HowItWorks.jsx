import Navbar from "../components/layout/Navbar";
import HowItWorksSection from "../components/home/HowItWorksSection";
import Footer from "../components/layout/Footer";

import "../styles/landing-sections.css";

function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#FBF4EA] text-[#3B241A]">
      <Navbar />

      <HowItWorksSection />

      <Footer />
    </div>
  );
}

export default HowItWorks;