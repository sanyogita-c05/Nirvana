import { User, Lock, Bell, KeyRound } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile Settings", icon: <User size={18} /> },
  { id: "password", label: "Password", icon: <Lock size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "license", label: "License", icon: <KeyRound size={18} /> },
];

function SettingsSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="settings-sidebar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </aside>
  );
}

export default SettingsSidebar;