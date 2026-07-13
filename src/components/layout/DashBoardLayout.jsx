import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";
import "../../styles/layout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <MobileSidebar />

      <div className="dashboard-content-area">

        <Topbar />

        <main className="dashboard-main-content">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;