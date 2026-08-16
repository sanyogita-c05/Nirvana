import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, uploadAvatar } from "../api/auth";
import api from "../api/api";

import {
  Package,
  ShoppingBag,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  Store,
  Pencil,
  Moon,
  LogOut,
} from "lucide-react";

import DashBoardLayout from "../components/layout/DashBoardLayout";
import StatCard from "../components/dashboard/StatCard";
import "./Profile.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({ products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [avatarBusy, setAvatarBusy] = useState(false);


  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const res = await getMe(token);
      setCurrentUser(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats({
        products: res.data.data.products.total,
        orders: res.data.data.orders.total,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchStats();
  }, [fetchUser, fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleAvatarFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarBusy(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await uploadAvatar(formData, token);
      setCurrentUser((prev) => ({ ...prev, avatar: res.data.data.avatar }));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload photo.");
    } finally {
      setAvatarBusy(false);
      e.target.value = "";
    }
  };


  if (loading) {
    return (
      <DashBoardLayout>
        <div style={{ padding: "40px", textAlign: "center" }}>
          Loading Profile...
        </div>
      </DashBoardLayout>
    );
  }

  if (!currentUser) {
    return (
      <DashBoardLayout>
        <div style={{ padding: "40px", textAlign: "center" }}>
          Unable to load profile.
        </div>
      </DashBoardLayout>
    );
  }

  return (
    <DashBoardLayout>
      <section className="profile-hero">
        <div className="profile-hero__left">
          <div className="profile-hero__eyebrow">
            <Store size={14} />
            Your Account
          </div>

          <div className="profile-hero__identity">
            {currentUser.avatar ? (
              <img
                src={`http://localhost:5000${currentUser.avatar}`}
                alt={currentUser.fullName}
                className="profile-avatar-xl"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="profile-avatar-xl">
                {currentUser.fullName?.charAt(0).toUpperCase()}
              </div>
            )}


            <div>
              <h1 className="profile-hero__name">{currentUser.fullName}</h1>
              <p className="profile-hero__studio">
                {currentUser.studio || "ArtisanSuite User"}
              </p>
            </div>
          </div>

          <div className="profile-hero__actions">
            <button className="hero-btn hero-btn--primary" onClick={() => navigate("/settings")}>
              <Pencil size={15} />
              Edit Profile
            </button>
            <label className="hero-btn" style={{ cursor: "pointer" }}>
              {avatarBusy ? "Uploading..." : "Change Photo"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarFileSelected}
                disabled={avatarBusy}
              />
            </label>
          </div>
        </div>

        <div className="profile-hero__overview">
          <h4>Account Overview</h4>

          <p>
            Manage your contact details, account information and application
            preferences from one place.
          </p>
        </div>
      </section>

      <div className="stats-grid profile-stats-grid">
        <StatCard
          icon={<Package size={20} />}
          value={`${stats.products}`}
          label="Products Listed"
          subtext="Total in inventory"
          growth=""
        />

        <StatCard
          icon={<ShoppingBag size={20} />}
          value={`${stats.orders}`}
          label="Orders Fulfilled"
          subtext="Since account creation"
          growth=""
        />

        <StatCard
          icon={<CalendarDays size={20} />}
          value={new Date(currentUser.createdAt).toLocaleDateString()}
          label="Member Since"
          subtext="Registered User"
          growth="Active"
        />
      </div>

      <div className="profile-content-grid">
        <div className="section-card">
          <div className="section-card__header">
            <h3>Account Info</h3>

            <button className="icon-link-btn" onClick={() => navigate("/settings")}>
              <Pencil size={14} />
              Edit
            </button>
          </div>

          <div className="info-row">
            <span className="info-row__label">
              <Phone size={16} />
              Phone
            </span>
            <span className="info-row__value">{currentUser.phone}</span>
          </div>

          <div className="info-row">
            <span className="info-row__label">
              <Mail size={16} />
              Mail
            </span>

            <span className="info-row__value">
              {currentUser.email}
            </span>
          </div>



          <div className="info-row">
            <span className="info-row__label">
              <Store size={16} />
              Studio
            </span>
            <span className="info-row__value">{currentUser.studio || "Not Added"}</span>
          </div>

          <div className="info-row">
            <span className="info-row__label">
              <MapPin size={16} />
              Location
            </span>
            <span className="info-row__value">{currentUser.address || "Not Added"}</span>
          </div>
        </div>

        <div className="section-card">
          <div className="section-card__header">
            <h3>Preferences</h3>
          </div>

          <div className="info-row">
            <span className="info-row__label">
              <Moon size={16} />
              Dark mode
            </span>

            <button
              className={`toggle-switch ${darkMode ? "on" : "off"}`}
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-knob" />
            </button>
          </div>

          <button
            className="info-row info-row--clickable"
            onClick={() => navigate("/settings")}
          >
            <span className="info-row__label">
              Account settings
            </span>

            <span className="info-row__chevron">
              '
            </span>
          </button>

          <button
            className="info-row info-row--clickable logout-row"
            onClick={handleLogout}
          >
            <span className="info-row__label">
              <LogOut size={16} />
              Log out
            </span>
          </button>
        </div>
      </div>
    </DashBoardLayout >
  );
}

export default ProfilePage;