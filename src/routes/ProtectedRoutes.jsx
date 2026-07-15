import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes({roleRequired }) {
    // const navigate = useNavigate();
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
      if (!token) {
         return <Navigate to="/login" replace />;
      }

      if (roleRequired  && userRole !== roleRequired ) {
        return <Navigate to="/login" replace />;
      }
      return <Outlet />;
}
