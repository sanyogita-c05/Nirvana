import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import SettingsSidebar from "../components/settings/SettingsSidebar";
import ProfileSettingsForm from "../components/settings/ProfileSettingsForm";
import PasswordSettings from "../components/settings/PasswordSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import VerificationSettings from "../components/settings/VerificationSettings";

import "../styles/settings.css";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettingsForm />;
      case "password":
        return <PasswordSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "verification":
        return <VerificationSettings />;
      default:
        return <ProfileSettingsForm />;
    }
  };

  return (
    <DashboardLayout>
      <div className="settings-page">

        <div className="settings-header">
          <h1>Account settings</h1>
          <p>Manage your profile, security and notification preferences.</p>
        </div>

        <div className="settings-layout">

          <SettingsSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="settings-content">
            {renderTab()}
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;