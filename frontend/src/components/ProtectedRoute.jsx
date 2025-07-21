import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children, adminOnly = false }) => {

    const { user } = useAuth();

    // Not logged in: redirect to login
    if (!user) return <Navigate to="/" replace />

    // Logged in but not admin when adminOnly is true: redirect to dashboard
    if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" replace />;

    return children;
}

export default ProtectedRoute;