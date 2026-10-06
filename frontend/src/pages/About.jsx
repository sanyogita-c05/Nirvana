import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/home/AboutSection";
import Footer from "../components/layout/Footer";

import "../styles/landing-sections.css";

function About() {
  return (
    <div className="min-h-screen bg-[#FBF4EA] text-[#3B241A]">
      <Navbar />

      <AboutSection />

      <Footer />
    </div>
  );
}

export default About;