import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import SetupSection from "../components/home/SetupSection";
import DashboardPreview from "../components/home/DashboardPreview";
import CTASection from "../components/home/CTASection";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#FBF4EA] text-[#3B241A]">
      <Navbar />
      <HeroSection />
      <StatsSection />

      <div id="about">
        <FeaturesSection />
      </div>

      <div id="how-it-works">
        <SetupSection />
      </div>

      <DashboardPreview />

      <div id="contact">
        <CTASection />
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;