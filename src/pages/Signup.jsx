
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../api/auth.js";
import { setStoredUser } from "../utils/userStore.js";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const features = [
    {
      title: "Inventory Management",
      desc: "Track raw materials and finished products with ease",
      icon: (
        <path d="M21 8L12 3 3 8m18 0-9 5m9-5v8l-9 5m0-8L3 8m9 5v8M3 8v8l9 5" />
      ),
    },
    {
      title: "Orders & Fulfilment",
      desc: "Manual orders, custom requests, and wholesale in one place",
      icon: (
        <>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </>
      ),
    },
    {
      title: "Payments & Ledger",
      desc: "Record dues, receipts, and outstanding balances",
      icon: (
        <>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </>
      ),
    },
    {
      title: "Business Insights",
      desc: "Know what sells, what sits, and what earns",
      icon: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      const token = res.data?.data?.token;
      const user = res.data?.data?.user;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        setStoredUser(user);
      }

      // alert(res.data?.message || "Registration successful");
      toast.success(res.data?.message || "Registration successful");

      navigate("/dashboard");
    } catch (err) {

      toast.error(err.response?.data?.message || "Registration failed");

      // alert(err.response?.data?.message || "Registration failed");
    }
    finally {
      // CHANGED: stop loading regardless of outcome
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT — brand panel */}
      <div className="login-brand">
        <div className="login-brand-blob-1" />
        <div className="login-brand-blob-2" />

        <div className="login-brand-content">
          <div className="login-logo-row">
            <div className="login-logo-badge">🌸</div>
            <span className="login-wordmark">ARTISANSUITE</span>
          </div>

          <h1 className="login-headline">
            Start your artisan
            <br />
            business journey
            <br />
            with confidence.
          </h1>

          <p className="login-subtext">
            Create your ArtisanSuite account and manage inventory, orders,
            payments, and growth — all in one place.
          </p>
        </div>

        <div className="login-features">
          {features.map((f) => (
            <div key={f.title} className="login-feature">
              <div className="login-feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </div>
              <div>
                <p className="login-feature-title">{f.title}</p>
                <p className="login-feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="login-trust-row">
          <div className="login-avatar-stack">
            {["#F5A623", "#F0537E", "#EE6A56"].map((c) => (
              <div
                key={c}
                className="login-avatar"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <p className="login-trust-text">
            Trusted by 2,400+ artisan businesses across India
          </p>
        </div>
      </div>

      {/* RIGHT — signup form */}
      <div className="login-form-panel">
        <div className="login-form-wrap">
          <div className="login-mobile-logo">
            <div className="login-logo-badge login-logo-badge--small">🌸</div>
            <span className="login-mobile-wordmark">
              Artisan<span>Suite</span>
            </span>
          </div>

          <div className="login-card">
            <h2 className="login-title">Create account</h2>
            <p className="login-subtitle">
              Join ArtisanSuite and start managing your business beautifully.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label className="login-label">FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="login-input"
                  required
                />
              </div>

              <div>
                <label className="login-label">PHONE NUMBER</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="login-input"
                  required
                />
              </div>

              <div>
                <label className="login-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@yourbusiness.in"
                  className="login-input"
                  required
                />
              </div>

              <div>
                <label className="login-label">PASSWORD</label>
                <div className="login-password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="login-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="login-toggle-visibility"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <label className="login-checkbox-row">
                <input type="checkbox" required />
                I agree to the Terms & Privacy Policy
              </label>

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            <hr className="login-divider" />

            <p className="login-signup-text">
              Already have an account?{" "}
              <Link to="/login" className="login-signup-link">
                Login
              </Link>
            </p>
          </div>

          <p className="login-fineprint">
            By creating an account, you agree to our <a href="#">Terms</a> &{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
