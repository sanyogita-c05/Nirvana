import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./BackButton.css";

function BackButton() {
  return (
    <Link to="/" className="back-home-btn">
      <FiArrowLeft size={17} />
      <span>Back to Home</span>
    </Link>
  );
}

export default BackButton;