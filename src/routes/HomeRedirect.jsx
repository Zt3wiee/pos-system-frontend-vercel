import { Navigate } from "react-router-dom";

export default function HomeRedirect() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "cashier") {
        return <Navigate to="/cashier/sales" replace />;
    }

    return <Navigate to="/login" replace />;
}