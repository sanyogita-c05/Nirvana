import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";
import "../../styles/layout.css";

function DashBoardLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <MobileSidebar
        open={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-content-area">

        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="dashboard-main-content">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashBoardLayout;