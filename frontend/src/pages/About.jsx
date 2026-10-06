import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackButton from "../components/layout/BackButton";
import AboutSection from "../components/home/AboutSection";

import "../styles/landing-sections.css";

function About() {
  return (
    <div className="min-h-screen bg-[#FBF4EA] text-[#3B241A]">
      <Navbar />

      <main className="subpage-main">
        <div className="container back-button-container">
          <BackButton />
        </div>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}

export default About;