import { Link } from "react-router-dom";
import "./CustomerTopbar.css";

function CustomerTopbar() {
  return (
    <header className="customer-topbar">
      <div className="brand-wrap">
        <div className="brand-badge">N</div>
        <div>
          <p className="brand-kicker">NIRVANA STORE</p>
          <h1>Nirvana Artisan Market</h1>
        </div>
      </div>

      <div className="view-toggle">
        <Link to="/dashboard" className="view-toggle-btn">
          Dashboard
        </Link>
        <span className="view-toggle-btn active" aria-current="page">
          Customer View
        </span>
      </div>
    </header>
  );
}

export default CustomerTopbar;