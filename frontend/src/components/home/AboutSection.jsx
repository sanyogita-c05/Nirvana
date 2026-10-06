import {
  FiHeart,
  FiTrendingUp,
  FiSmartphone,
} from "react-icons/fi";

import BackButton from "../layout/BackButton";

const POINTS = [
  {
    icon: <FiHeart size={22} />,
    title: "Made for makers",
    text: "Built around how handmade sellers actually work: custom orders, small batches and festival rushes.",
  },
  {
    icon: <FiSmartphone size={22} />,
    title: "Works on your phone",
    text: "Update stock, record a payment or check an order from the workshop, the market or the couch.",
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Grow with clarity",
    text: "See what sells, what doesn't and who owes you, so every decision is backed by real numbers.",
  },
];
function AboutSection() {
  return (
    <section id="about" className="landing-section about-section">
      <div className="container">

        <div className="landing-heading">
          

          <h2>
            Craft is personal. <em>Your tools should be too.</em>
          </h2>

          <p>
            ArtisanSuite is the all-in-one business tool for Indian handmade
            sellers and creators. We replace scattered notebooks, chats and
            spreadsheets with one calm place to run your studio.
          </p>
        </div>

        <div className="about-grid">
          {POINTS.map((point) => (
            <div className="about-card" key={point.title}>
              <span className="about-icon">{point.icon}</span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutSection;