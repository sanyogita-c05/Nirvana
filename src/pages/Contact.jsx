import {
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaYoutube,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  const contacts = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "nirvana.acad@gmail.com",
      link: "mailto:nirvana.acad@gmail.com",
      color: "#6C4DF6",
    },
    {
      icon: <FaGlobe />,
      title: "Website",
      value: "Nirvana Elevate",
      link: "https://sites.google.com/view/nirvanaelevate",
      color: "#FF8C42",
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      value: "Follow Our Journey",
      link: "https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all",
      color: "#0077B5",
    },
    {
      icon: <FaYoutube />,
      title: "YouTube",
      value: "Watch & Learn",
      link: "https://www.youtube.com/@nirvanaSpeaks_Elevate",
      color: "#FF0000",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8f6ff,#ffffff,#fff7ef)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Hero */}

      <section
        style={{
          padding: "90px 8% 70px",
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
          Contact Us
        </span>

        <h1
          style={{
            fontSize: "3rem",
            marginTop: "30px",
            color: "#222",
          }}
        >
          We'd Love To
          <br />

          <span
            style={{
              background:
                "linear-gradient(90deg,#6C4DF6,#FF6B6B)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Hear From You
          </span>
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "25px auto",
            color: "#666",
            lineHeight: "1.8",
          }}
        >
          Whether you're an artist, a learner, or simply curious about
          ArtisanSuite, we're always happy to connect. Reach out through
          any of the platforms below.
        </p>
      </section>

      {/* Contact Cards */}

      <section
        style={{
          padding: "0 8% 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
          {contacts.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "#222",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "35px",
                  borderRadius: "24px",
                  textAlign: "center",
                  boxShadow:
                    "0 18px 40px rgba(0,0,0,.08)",
                  transition: ".3s",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: item.color,
                    color: "#fff",
                    fontSize: "34px",
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
                    marginTop: "12px",
                    color: "#666",
                    lineHeight: "1.7",
                  }}
                >
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Extra Information */}

      <section
        style={{
          padding: "0 8% 90px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "25px",
              boxShadow:
                "0 18px 40px rgba(0,0,0,.08)",
            }}
          >
            <FaClock
              size={42}
              color="#6C4DF6"
            />

            <h2
              style={{
                marginTop: "20px",
              }}
            >
              Office Hours
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: "1.8",
                marginTop: "15px",
              }}
            >
              Monday – Friday
              <br />
              9:00 AM – 6:00 PM
              <br />
              (IST)
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "25px",
              boxShadow:
                "0 18px 40px rgba(0,0,0,.08)",
            }}
          >
            <FaMapMarkerAlt
              size={42}
              color="#FF8C42"
            />

            <h2
              style={{
                marginTop: "20px",
              }}
            >
              Stay Connected
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: "1.8",
                marginTop: "15px",
              }}
            >
              Follow Nirvana Transformation Academy to stay updated with
              inspiring stories, learning opportunities, workshops,
              events, and community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section
        style={{
          padding: "0 8% 90px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#6C4DF6,#FF6B6B)",
            borderRadius: "35px",
            padding: "70px 30px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
            }}
          >
            Let's Build Something Amazing Together
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "25px auto 40px",
              lineHeight: "1.8",
            }}
          >
            Every great journey begins with a conversation. Whether you
            have questions, ideas, or feedback, we're just one message
            away.
          </p>

          <a
            href="mailto:nirvana.acad@gmail.com"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#6C4DF6",
              textDecoration: "none",
              padding: "16px 40px",
              borderRadius: "50px",
              fontWeight: "bold",
            }}
          >
            Send an Email
          </a>
        </div>
      </section>

      {/* Footer */}

      <footer
        style={{
          background: "#1E1B2E",
          color: "#fff",
          padding: "40px 8%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                marginBottom: "12px",
              }}
            >
              ArtisanSuite
            </h2>

            <p
              style={{
                color: "#ccc",
                lineHeight: "1.8",
                maxWidth: "500px",
              }}
            >
              Empowering artists with technology to simplify business,
              showcase creativity, and inspire growth.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.linkedin.com/company/nirvana-transformation-academy/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>

            <a
              href="https://www.youtube.com/@nirvanaSpeaks_Elevate"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              YouTube
            </a>

            <a
              href="mailto:nirvana.acad@gmail.com"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Email
            </a>
          </div>
        </div>

        <hr
          style={{
            margin: "35px 0",
            borderColor: "#444",
          }}
        />

        <p
          style={{
            textAlign: "center",
            color: "#bbb",
          }}
        >
          © 2026 Nirvana Elevate. All rights reserved. Built to inspire
          growth, learning, and transformation.
        </p>
      </footer>
    </div>
  );
}

export default Contact;