import { FiUserPlus, FiPackage, FiShoppingBag, FiBarChart2 } from "react-icons/fi";

const STEPS = [
  {
    icon: <FiUserPlus size={24} />,
    title: "Create your studio",
    text: "Sign up and set up your shop name in a couple of minutes.",
  },
  {
    icon: <FiPackage size={24} />,
    title: "Add your products",
    text: "List what you make, with prices and stock, so everything is in one place.",
  },
  {
    icon: <FiShoppingBag size={24} />,
    title: "Track orders & payments",
    text: "Log custom orders, mark payments received and see who still owes you.",
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: "Grow with insights",
    text: "Watch revenue, top sellers and low stock on your dashboard.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="landing-section how-section">
      <div className="container">

        <div className="landing-heading">
          <span className="landing-tag">How It Works</span>
          <h2>
            From first product to <em>full business</em> in four steps
          </h2>
        </div>

        <ol className="steps-grid">
          {STEPS.map((step, index) => (
            <li className="step-card" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <span className="step-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}

export default HowItWorksSection;