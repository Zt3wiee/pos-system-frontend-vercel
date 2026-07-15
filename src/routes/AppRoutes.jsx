import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import AdminDashboard from "../features/admin/AdminDashboard";
import CashierLayout from "../Layouts/CashierLayout";
import Sales from "../features/cashier/Sales";
import Login from "../features/auth/Login";
import OrdersPage from "../features/cashier/Orders";
import ProtectedRoutes from "./ProtectedRoutes";
import InventoryPage from "../features/admin/Inventory";
import SalesReport from "../features/admin/SalesReport";
import UserManagementPage from "../features/admin/Users";
import Categories from "../features/admin/Categories";
import Settings from "../features/admin/Settings";
import HomeRedirect from "./HomeRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },

  {
    path: "/login",
    element: <Login />,
  },

   // Admin protected routes
  {
    element: <ProtectedRoutes roleRequired="admin" />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
           {
            path: "inventory",
            element: <InventoryPage/>
          },
           {
            path: "reports",
            element: <SalesReport/>
          },
           {
            path: "users",
            element: <UserManagementPage/>
          },
           {
            path: "categories",
            element: <Categories/>
          },
          {
            path: "settings",
            element: <Settings/>
          }
        ],
      },
    ],
  },

  // Cashier protected routes
  {
    element: <ProtectedRoutes roleRequired="cashier" />,
    children: [
      {
        path: "/cashier",
        element: <CashierLayout />,
        children: [
          // {
          //   path: "dashboard",
          //   element: <CashierDashboard />,
          // },
          {
            path: "sales",
            element: <Sales />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
        ],
      },
    ],
  },
]);

export default router;