import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaPalette,
  FaChartLine,
  FaUsers,
  FaRocket,
} from "react-icons/fa";

function About() {
  const features = [
    {
      icon: <FaPalette />,
      title: "Empowering Artists",
      text: "Helping artists and artisans showcase their creativity with a professional digital storefront.",
    },
    {
      icon: <FaChartLine />,
      title: "Business Growth",
      text: "Track inventory, orders, and customers while focusing on growing your business.",
    },
    {
      icon: <FaUsers />,
      title: "Community Driven",
      text: "Built to connect talented creators with customers who appreciate handmade craftsmanship.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f9f7ff,#ffffff,#fff6ef)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Hero */}
      <section
        style={{
          padding: "90px 8%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "50px",
        }}
      >
        <div style={{ flex: "1", minWidth: "300px" }}>
          <span
            style={{
              background: "#efe9ff",
              color: "#6c4df6",
              padding: "8px 18px",
              borderRadius: "30px",
              fontWeight: 600,
            }}
          >
            About ArtisanSuite
          </span>

          <h1
            style={{
              fontSize: "3rem",
              marginTop: "25px",
              lineHeight: "1.2",
              color: "#222",
            }}
          >
            Empowering Artists Through
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg,#6c4df6,#ff6b6b)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Digital Transformation
            </span>
          </h1>

          <p
            style={{
              marginTop: "20px",
              color: "#666",
              lineHeight: "1.8",
              maxWidth: "650px",
            }}
          >
            ArtisanSuite is a modern platform designed to help artists,
            creators, and small businesses manage their artwork, products,
            customers, and orders—all from one beautiful dashboard.
            Our mission is to simplify business operations so artists can
            focus on what they do best: creating.
          </p>

          <Link
            to="/how-it-works"
            style={{
              display: "inline-block",
              marginTop: "35px",
              padding: "15px 35px",
              borderRadius: "50px",
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              background:
                "linear-gradient(90deg,#6c4df6,#ff8c42)",
              boxShadow: "0 10px 25px rgba(108,77,246,.3)",
            }}
          >
            Explore Platform →
          </Link>
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "350px",
              height: "350px",
              borderRadius: "40px",
              background:
                "linear-gradient(135deg,#6c4df6,#ff6b6b,#ffb547)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "120px",
              boxShadow: "0 30px 60px rgba(0,0,0,.15)",
            }}
          >
            🎨
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        style={{
          padding: "0 8% 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "25px",
            padding: "35px",
            boxShadow: "0 15px 40px rgba(0,0,0,.08)",
          }}
        >
          <FaBullseye
            size={45}
            color="#6c4df6"
          />

          <h2 style={{ marginTop: "20px" }}>Our Mission</h2>

          <p
            style={{
              color: "#666",
              lineHeight: "1.8",
              marginTop: "15px",
            }}
          >
            To provide artists and creators with an easy-to-use platform
            that helps them showcase their talent, manage their business,
            and reach more customers through digital innovation.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "25px",
            padding: "35px",
            boxShadow: "0 15px 40px rgba(0,0,0,.08)",
          }}
        >
          <FaEye
            size={45}
            color="#ff8c42"
          />

          <h2 style={{ marginTop: "20px" }}>Our Vision</h2>

          <p
            style={{
              color: "#666",
              lineHeight: "1.8",
              marginTop: "15px",
            }}
          >
            To become the preferred digital ecosystem for artists and
            artisans by simplifying business management and inspiring
            creativity through technology.
          </p>
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
            fontSize: "2.3rem",
            color: "#222",
          }}
        >
          Why Choose ArtisanSuite?
        </h2>

        <p
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "20px auto 60px",
            color: "#666",
            lineHeight: "1.8",
          }}
        >
          Designed specifically for artists, ArtisanSuite combines
          beautiful design with powerful management tools, making it
          easier than ever to grow your creative business.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "25px",
                padding: "35px",
                textAlign: "center",
                boxShadow: "0 15px 35px rgba(0,0,0,.08)",
                transition: ".3s",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "35px",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg,#6c4df6,#ff8c42)",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  marginTop: "25px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  marginTop: "15px",
                  color: "#666",
                  lineHeight: "1.8",
                }}
              >
                {item.text}
              </p>
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
            borderRadius: "35px",
            padding: "60px 30px",
            textAlign: "center",
            background:
              "linear-gradient(135deg,#6c4df6,#ff6b6b)",
            color: "#fff",
          }}
        >
          <FaRocket size={55} />

          <h2
            style={{
              marginTop: "25px",
              fontSize: "2.4rem",
            }}
          >
            Ready to Start Your Journey?
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "20px auto 40px",
              lineHeight: "1.8",
            }}
          >
            Join ArtisanSuite and discover how technology can simplify
            your creative business while helping you reach more customers.
          </p>

          <Link
            to="/login"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              borderRadius: "50px",
              background: "#fff",
              color: "#6c4df6",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;