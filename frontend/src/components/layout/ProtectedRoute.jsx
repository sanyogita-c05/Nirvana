import { Navigate } from "react-router-dom";
import { hasValidSession } from "../../utils/authStorage";

function ProtectedRoute({ children }) {
  return hasValidSession() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;