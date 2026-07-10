import { NavLink } from "react-router-dom";

function ViewToggle() {
  return (
    <div className="view-toggle">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `view-toggle-btn ${isActive ? "active" : ""}`
        }
      >
        <span className="view-toggle-icon">◫</span>
        Dashboard
      </NavLink>

      <NavLink
        to="/customer-view"
        className={({ isActive }) =>
          `view-toggle-btn ${isActive ? "active" : ""}`
        }
      >
        <span className="view-toggle-icon">◫</span>
        Customer View
      </NavLink>
    </div>
  );
}

export default ViewToggle;