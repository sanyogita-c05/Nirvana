import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
// Frontend-only placeholder data — swap for real user/account
// data once a backend is connected.
const currentUser = {
  name: "Meera Sharma",
  studio: "Meera's Craft",
  location: "Jaipur, Rajasthan",
  phone: "+91 98765 43210",
  email: "meera@artisansuite.com",
  avatarInitial: "M",
  memberSince: "Jan 2024",
};

function ProfilePage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    // Frontend-only: clear any local session state here later,
    // then redirect to login.
    navigate("/login");
  };

  return (
    <DashBoardLayout>
      {/* Hero banner, same language as the Inventory page */}
      <section className="profile-hero">
        <div className="profile-hero__left">
          <div className="profile-hero__eyebrow">
            <Store size={14} />
            Your Account
          </div>

          <div className="profile-hero__identity">
            <div className="profile-avatar-xl">{currentUser.avatarInitial}</div>
            <div>
              <h1 className="profile-hero__name">{currentUser.name}</h1>
              <p className="profile-hero__studio">
                {currentUser.studio} · {currentUser.location}
              </p>
            </div>
          </div>

          <div className="profile-hero__actions">
            <button className="hero-btn hero-btn--primary">
              <Pencil size={15} />
              Edit Profile
            </button>
            <button className="hero-btn">Change Photo</button>
          </div>
        </div>

        <div className="profile-hero__overview">
          <h4>Account Overview</h4>
          <p>
            Manage your contact details, studio info, and app preferences
            from a single place.
          </p>
        </div>
      </section>

      {/* Stat row, reusing the real StatCard component */}
      <div className="stats-grid profile-stats-grid">
        <StatCard
          icon={<Package size={20} />}
          value="12"
          label="Products Listed"
          subtext="Across 2 categories"
          growth="2 this month"
        />
        <StatCard
          icon={<ShoppingBag size={20} />}
          value="34"
          label="Orders Fulfilled"
          subtext="Since account creation"
          growth="5 this month"
        />
        <StatCard
          icon={<CalendarDays size={20} />}
          value={currentUser.memberSince}
          label="Member Since"
          subtext="Shop status: Open"
          growth="Active"
        />
      </div>

      {/* Content cards: account info + preferences */}
      <div className="profile-content-grid">
        <div className="section-card">
          <div className="section-card__header">
            <h3>Account Info</h3>
            <button className="icon-link-btn">
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
            <span className="info-row__value">{currentUser.email}</span>
          </div>

          <div className="info-row">
            <span className="info-row__label">
              <Store size={16} />
              Studio
            </span>
            <span className="info-row__value">{currentUser.studio}</span>
          </div>

          <div className="info-row">
            <span className="info-row__label">
              <MapPin size={16} />
              Location
            </span>
            <span className="info-row__value">{currentUser.location}</span>
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
            <span className="info-row__label">Account settings</span>
            <span className="info-row__chevron">›</span>
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
    </DashBoardLayout>
  );
}

export default ProfilePage;