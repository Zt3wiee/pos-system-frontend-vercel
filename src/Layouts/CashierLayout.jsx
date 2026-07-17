// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { logout } from "../api/AuthApi";
// import { useUsers } from "../api/Users";
// import { Store, ShoppingCart, ClipboardList, Settings, LogOut, Monitor } from "lucide-react";

// function CashierLayout() {
//   const user = useUsers();
//   const navigate = useNavigate();

//   const handlelogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   // Active link styling for the sidebar
//   const navClass = ({ isActive }) => 
//     `flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 group ${
//       isActive 
//       ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
//       : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
//     }`;

//   return (
//     <div className="flex h-screen w-full bg-[#050505] text-slate-300 overflow-hidden font-sans">
      
//       {/* 1. LEFT SIDEBAR (The Navigation) */}
//       <nav className="w-24 bg-[#0a0a0c] flex flex-col items-center py-8 border-r border-white/5">
        
//         {/* Brand Logo Area */}
//         <div className="mb-12">
//           <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-2xl shadow-blue-900/40 transform hover:rotate-12 transition-transform cursor-pointer">
//             <Store size={28} />
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex-1 space-y-4">
//           <NavLink to="/cashier/sales" className={navClass}>
//             <ShoppingCart size={22} />
//             <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">Terminal</span>
//           </NavLink>

//           <NavLink to="/cashier/orders" className={navClass}>
//             <ClipboardList size={22} />
//             <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">Orders</span>
//           </NavLink>
//         </div>

//         {/* Bottom Actions */}
//         {/* <div className="space-y-4 pt-4 border-t border-white/5">
//           <button 
//             onClick={() => navigate("/settings")} 
//             className="w-12 h-12 flex items-center justify-center text-slate-600 hover:text-blue-500 transition-colors"
//           >
//             <Settings size={20} />
//           </button>
//         </div> */}
//       </nav>

//       {/* 2. MAIN WORKSPACE */}
//       <div className="flex-1 flex flex-col min-w-0">
        
//         {/* TOP STATUS BAR - Ultra clean and minimal */}
//         <header className="h-14 bg-[#0a0a0c] border-b border-white/5 flex items-center justify-between px-8">
          
//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 px-3 py-1 rounded-full">
//               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//               <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
//                 System Online
//               </span>
//             </div>
            
//             <div className="flex items-center gap-2 text-slate-500">
//               <Monitor size={14} />
//               <span className="text-[11px] font-medium tracking-tight uppercase">
//                 Terminal #04 <span className="opacity-30 mx-1">|</span> Register 1
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-8">
//             {/* User Profile Info */}
//             <div className="flex items-center gap-4 border-r border-white/5 pr-8">
//               <div className="text-right">
//                 <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none mb-1">
//                   {user?.role || "Operator"}
//                 </p>
//                 <p className="text-sm font-bold text-white tracking-tight">
//                   {user?.name || "Alex Johnson"}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-b from-white/10 to-transparent rounded-full border border-white/10 flex items-center justify-center font-bold text-xs text-white">
//                 {user?.name?.charAt(0) || "A"}
//               </div>
//             </div>

//             {/* Logout Button */}
//             <button
//               onClick={handlelogout}
//               className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group"
//             >
//               <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Sign Out</span>
//               <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </header>

//         {/* 3. DYNAMIC CONTENT AREA */}
//         <main className="flex-1 relative overflow-hidden bg-[#050505]">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }
// export default CashierLayout;






import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/AuthApi";
import { useUsers } from "../api/Users";
import {
  Store,
  ShoppingCart,
  ClipboardList,
  LogOut,
  Monitor,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function CashierLayout() {
  const user = useUsers();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlelogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navClass = ({ isActive }) =>
    `flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 group ${
      isActive
        ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
    }`;

  return (
    <div className="flex h-screen w-full bg-[#050505] text-slate-300 overflow-hidden font-sans">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed lg:static
          top-0 left-0
          h-full
          w-24
          bg-[#0a0a0c]
          flex flex-col items-center py-8
          border-r border-white/5
          z-40
          transform transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div className="mb-12">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-2xl shadow-blue-900/40 hover:rotate-12 transition-transform cursor-pointer">
            <Store size={28} />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 space-y-4">
          <NavLink
            to="/cashier/sales"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <ShoppingCart size={22} />
            <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">
              Terminal
            </span>
          </NavLink>

          <NavLink
            to="/cashier/orders"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <ClipboardList size={22} />
            <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">
              Orders
            </span>
          </NavLink>
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-14 bg-[#0a0a0c] border-b border-white/5 flex items-center justify-between px-4 md:px-8">

          {/* Left */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* Hamburger */}
            <button
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Online Status */}
            <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest hidden sm:block">
                System Online
              </span>
            </div>

            {/* Terminal */}
            <div className="hidden md:flex items-center gap-2 text-slate-500">
              <Monitor size={14} />
              <span className="text-[11px] font-medium tracking-tight uppercase">
                Terminal #04
                <span className="opacity-30 mx-1">|</span>
                Register 1
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 md:gap-8">

            {/* User */}
            <div className="flex items-center gap-3 md:gap-4 md:border-r md:border-white/5 md:pr-8">

              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none mb-1">
                  {user?.role || "Operator"}
                </p>

                <p className="text-sm font-bold text-white tracking-tight">
                  {user?.name || "Alex Johnson"}
                </p>
              </div>

              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-b from-white/10 to-transparent rounded-full border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                {user?.name?.charAt(0) || "A"}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handlelogout}
              className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                Sign Out
              </span>

              <LogOut
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

          </div>
        </header>

        {/* Content */}
        <main className="flex-1 relative overflow-hidden bg-[#050505]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default CashierLayout;