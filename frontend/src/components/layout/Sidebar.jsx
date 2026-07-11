import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="dashboard-content-area">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="dashboard-main-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;