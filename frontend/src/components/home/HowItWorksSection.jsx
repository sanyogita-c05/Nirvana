
import {
  FiUserPlus,
  FiPackage,
  FiShoppingBag,
  FiBarChart2,
} from "react-icons/fi";

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
    <section className="landing-section how-section">
      <div className="container">

        {/* Heading */}
        <div className="landing-heading how-heading">
          <h2>
            From first product to{" "}
            <em>full business</em>
            <br />
            in four steps
          </h2>

          <p>
            Everything you need to set up, manage and grow your
            handmade business — all in one place.
          </p>
        </div>

        {/* Steps */}
        <ol className="steps-grid">
          {STEPS.map((step, index) => (
            <li className="step-card" key={step.title}>

              {/* Step Number */}
              <span className="step-number">
                {index + 1}
              </span>

              {/* Icon */}
              <span className="step-icon">
                {step.icon}
              </span>

              {/* Content */}
              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        {/* Demo Video Section */}
        <div className="demo-video-section">

          <div className="demo-video-heading">
            <h2>
              See Artisan<em>Suite</em> in Action
            </h2>

            <p>
              Take a quick tour of ArtisanSuite and discover how
              you can manage your handmade business in one place.
            </p>
          </div>

          <div className="demo-video-container">
            <video
              className="demo-video"
              controls
              playsInline
              preload="metadata"
            >
              <source
                src="/DemoVideo.mp4"
                type="video/mp4"
              />

              Your browser does not support HTML video.
            </video>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;
