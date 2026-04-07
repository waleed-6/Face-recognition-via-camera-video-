import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function PaywallGuard({ children }) {
  const { user } = useAuth();
  if (user?.subscription_status === "expired") {
    return <Navigate to="/subscribe" replace />;
  }
  return children;
}
