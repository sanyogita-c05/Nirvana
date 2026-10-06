import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Your Account",
      description:
        "Sign in securely to access your personalized ArtisanSuite dashboard and start managing your business.",
      color: "#6C4DF6",
    },
    {
      icon: <FaBoxOpen />,
      title: "Manage Products",
      description:
        "Add handmade products, update inventory, organize categories, and keep everything up to date.",
      color: "#FF8C42",
    },
    {
      icon: <FaShoppingCart />,
      title: "Handle Orders",
      description:
        "Monitor customer orders, manage deliveries, and ensure a smooth purchasing experience.",
      color: "#00C2A8",
    },
    {
      icon: <FaChartLine />,
      title: "Grow Your Business",
      description:
        "Track performance, analyze trends, and make better business decisions with powerful insights.",
      color: "#FF6B6B",
    },
  ];

  const features = [
    "Product Inventory",
    "Customer Management",
    "Order Tracking",
    "Analytics Dashboard",
    "Secure Login",
    "Easy Navigation",
    "Responsive Design",
    "Modern Interface",
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#f8f6ff,#ffffff,#fff8f1)",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Hero */}
      <section
        style={{
          padding: "90px 8%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            background: "#ece7ff",
            color: "#6C4DF6",
            padding: "8px 18px",
            borderRadius: "30px",
            fontWeight: 600,
          }}
        >
          How ArtisanSuite Works
        </span>

        <h1
          style={{
            fontSize: "3rem",
            marginTop: "30px",
            color: "#222",
          }}
        >
          Grow Your Creative Business
          <br />

          <span
            style={{
              background:
                "linear-gradient(90deg,#6C4DF6,#FF6B6B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            In Just 4 Simple Steps
          </span>
        </h1>

        <p
          style={{
            maxWidth: "800px",
            margin: "25px auto",
            color: "#666",
            lineHeight: "1.8",
          }}
        >
          ArtisanSuite makes managing artwork, inventory, orders, and
          customers effortless. Whether you're an independent artist or
          a growing creative business, everything you need is available
          in one place.
        </p>
      </section>

      {/* Steps */}
      <section
        style={{
          padding: "0 8% 90px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "30px",
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "25px",
                padding: "35px",
                textAlign: "center",
                boxShadow:
                  "0 18px 40px rgba(0,0,0,.08)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: step.color,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </div>

              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  background: step.color,
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "38px",
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  marginTop: "25px",
                  color: "#222",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  marginTop: "15px",
                  color: "#666",
                  lineHeight: "1.8",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section
        style={{
          padding: "20px 8% 90px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.4rem",
            marginBottom: "60px",
          }}
        >
          Simple Workflow
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "25px",
            alignItems: "center",
          }}
        >
          {["Login", "Manage", "Sell", "Grow"].map(
            (item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    padding: "25px 35px",
                    borderRadius: "18px",
                    fontWeight: 600,
                    boxShadow:
                      "0 12px 25px rgba(0,0,0,.08)",
                  }}
                >
                  {item}
                </div>

                {index !== 3 && (
                  <FaArrowRight
                    style={{
                      margin: "0 18px",
                      color: "#6C4DF6",
                      fontSize: "24px",
                    }}
                  />
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "20px 8% 90px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontSize: "2.3rem",
          }}
        >
          Platform Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "22px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                boxShadow:
                  "0 12px 25px rgba(0,0,0,.08)",
              }}
            >
              <FaCheckCircle
                color="#6C4DF6"
                size={22}
              />

              <span
                style={{
                  fontWeight: 500,
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 8%",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#6C4DF6,#FF6B6B)",
            borderRadius: "35px",
            padding: "70px 30px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.6rem",
            }}
          >
            Ready to Transform Your Business?
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "25px auto 40px",
              lineHeight: "1.8",
            }}
          >
            Join ArtisanSuite today and experience a smarter way to
            manage your creative business with powerful tools,
            beautiful design, and effortless organization.
          </p>

          <Link
            to="/login"
            style={{
              background: "#fff",
              color: "#6C4DF6",
              textDecoration: "none",
              padding: "16px 42px",
              borderRadius: "50px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Login Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;