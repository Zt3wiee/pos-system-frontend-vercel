import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/AuthApi";
import { useUsers } from "../api/Users";
import {  BarChart3,  FolderTree,  LayoutDashboard,  Moon,  Package,  Settings,  Sun,  SunMoon,  Users,} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [theme , setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const navigate = useNavigate();
  const user = useUsers(); // Fetch user data using the custom hook
     
     useEffect(() => {
      const html = document.documentElement;
      if (theme === "dark") {
        html.classList.add("dark");
      }else {
        html.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
     }, [theme]);

      const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      }



  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Helper for consistent navigation styling
  const navLinkClass = ({ isActive }) =>
    `flex items-center px-6 py-3 transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
    }`;

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  return (
    <div className="flex h-screen bg-gray-200 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-gray-100 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            System Control
          </p>
        </div>

        <nav className="flex-1 mt-6">
          <p className="px-6 text-[10px] text-slate-500 font-bold uppercase mb-2">
            Analytics
          </p>
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <LayoutDashboard size={20} />
            <span className="pl-3">Dashboard</span>
          </NavLink>

          <p className="px-6 text-[10px] text-slate-500 font-bold uppercase mt-6 mb-2">
            Management
          </p>
          <NavLink to="/admin/inventory" className={navLinkClass}>
            <Package size={20} />
            <span className="pl-3">Inventory</span>
          </NavLink>
          <NavLink to="/admin/categories" className={navLinkClass}>
            <FolderTree size={20} />
            <span className="pl-3">Categories</span>
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            <Users size={20} />
            <span className="pl-3">Users</span>
          </NavLink>
          <NavLink to="/admin/reports" className={navLinkClass}>
            <BarChart3 size={20} />
            <span className="pl-3">Sales Reports</span>
          </NavLink>
          <NavLink to="/admin/settings" className={navLinkClass}>
            <Settings size={20} />
            <span className="pl-3">Settings</span>
          </NavLink>
        </nav>
        <div className="p-6 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors duration-200"
          >
            <span>←</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 flex items-center justify-between px-8 ">
          {/* Left: Page Title */}
          <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Dashboard Overview
          </h2>



          {/* Dark Mode  */}
          <button
            className="text-gray-900 dark:text-white"
            onClick={toggleTheme}
          >
            {
              theme === "dark" ? (
                <Moon size={25} />
              ) : (
                <Sun size={25} />
              )
            }
            
            {/* <Moon size={25} /> */}
          </button>

          </div>


          {/* Right: User Profile Information */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 dark:text-white">
                {user?.email || "User"}
              </p>
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-widerdark:text-white">
                {user?.role || "Role"}
              </p>
            </div>

            {/* Avatar/Initials */}
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white  font-bold shadow-sm">
              {user?.name?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-3 dark:bg-zinc-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
