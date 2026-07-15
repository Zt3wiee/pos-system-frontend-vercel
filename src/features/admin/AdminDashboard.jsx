import React, { useState } from "react";
import Order from "../../api/Order";
import {
  DollarSign,
  ShoppingCart,
  PlusCircle,
  BarChart3,
  Users,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSummary } from "../../api/SaleReports";
import AddProductModal from "../../components/AddProductModal";

export default function AdminDashboard() {
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  // ✅ Inferred data structure from previous interactions
  const summary = useSummary();
  const stats = [
    {
      title: "Today's Revenue",
      value: `$${summary?.todayRevenue || 0}`,
      icon: <DollarSign size={24} className="text-blue-600" />,
      change: "",
    },
    {
      title: "Transactions",
      value: summary?.todayOrders || 0,
      icon: <ShoppingCart size={24} className="text-indigo-600" />,
      change: summary?.todayOrders || 0,
    },
    {
      title: "Monthly Revenue",
      value: `$${summary?.monthRevenue || "..."}`,
      icon: <TrendingUp className="text-emerald-600" />,
      change: "",
    },
    {
      title: "Monthly Orders",
      value: summary?.monthOrders || "...",
      icon: <Layers className="text-purple-600" />,
      change: summary?.monthOrders || "...",
    },
    {
      title: "Yearly Revenue",
      value: `$${summary?.yearRevenue || "..."}`,
      icon: <TrendingUp className="text-yellow-600" />,
      change: "",
    },
  ];
  const [openAddModal, setOpenAddmodal] = useState(false);

  const { orders, loading } = Order();

  // Sample data fallback if orders API is not working yet
  const displayOrders =
    !loading && orders?.length > 0
      ? orders
      : [
          { id: "1021", user: { name: "John Doe" }, total_amount: "$45.00" },
          { id: "1022", user: { name: "Jane Smith" }, total_amount: "$120.50" },
          { id: "1023", user: { name: "Mike Ross" }, total_amount: "$60.00" },
        ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-slate-900 p-6 md:p-10 font-sans rounded-xl">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-7 bg-blue-600 rounded-full" />
            <h2 className="text-3xl font-black tracking-tight uppercase dark:text-white">
              Admin Console
            </h2>
          </div>
          <p className="text-slate-400 dark:text-white font-medium text-sm ml-4">
            Welcome back • System Overview •{" "}
            <span className="text-slate-700 font-bold dark:text-slate-300">March 2026</span>
          </p>
        </div>
      </div>

      {/* --- KPI Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative bg-white dark:bg-zinc-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-zinc-600 hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 dark:bg-zinc-600 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-50 transition-colors">
                {stat.icon}
              </div>
              <ArrowUpRight
                size={20}
                className="text-slate-300 group-hover:text-blue-600 transition-colors"
              />
            </div>

            <p className="text-[11px] font-black text-slate-400 dark:text-white uppercase tracking-[0.15em] mb-1">
              {stat.title}
            </p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {stat.value}
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-50/20 px-2.5 py-1 rounded-full">
                {stat.change}
              </span>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-50/50  rounded-full blur-3xl group-hover:bg-blue-100 transition-all" />
          </div>
        ))}
      </div>

      {/* --- Bottom Section: Split Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* --- Recent Orders: Clean Table Layout --- */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">
                Recent Orders
              </h3>
            </div>
            {orders.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
              >
                {showAll ? "Show Less" : "See More"}
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-600 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-100/30">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="bg-slate-900 text-white  text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="py-5 px-8">Order ID</th>
                  <th className="py-5 px-20">Customer</th>
                  <th className="py-5 px-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-600">
                {displayOrders
                  .slice(0, showAll ? displayOrders.length : 4)
                  .map((order, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-blue-50/30 dark:hover:bg-blue-50/30 transition-all cursor-default"
                    >
                      <td className="py-5 px-10 font-mono text-blue-600 font-bold">
                        {loading ? "..." : `#${order.id}`}
                      </td>
                      <td className="py-5 px-22 font-extrabold text-slate-700 dark:text-white">
                        {loading ? "Loading..." : order.user.name}
                      </td>
                      <td className="py-5 px-9 text-right font-black text-slate-900 dark:text-white text-lg">
                        {loading ? "..." : order.total_amount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* {orders.length > 6 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                  {showAll ? "Show Less" : "See More"}
                </button>
              </div>
            )} */}
            {showAll && (
              <div className="flex justify-center mt-6 pb-4">
                <button
                  onClick={() => setShowAll(false)}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Quick Actions: Solid Cards with Icons --- */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 bg-blue-600 rounded-full" />
            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">
              Quick Operations
            </h3>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setOpenAddmodal(true);
              }}
              className="w-full flex items-center gap-4 bg-slate-900 hover:bg-slate-800 text-white p-5 rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-0.5 group hover:shadow-slate-600"
            >
              <PlusCircle size={22} className="text-blue-400" />
              <span>Add New Product</span>
              <ChevronRight
                size={18}
                className="ml-auto text-slate-600 group-hover:text-white transition-transform group-hover:translate-x-1"
              />
            </button>

            <ActionButton
              icon={<BarChart3 />}
              title="View Sales Report"
              onClick={() => navigate("/admin/reports")}
            />
            <ActionButton
              onClick={() => navigate("/admin/users")}
              icon={<Users />}
              title="Manage User Accounts"
            />
          </div>
        </div>
      </div>
      <AddProductModal
        openModal={openAddModal}
        setOpenModal={() => setOpenAddmodal(false)}
      />
    </div>
  );
}

// ✅ Reusable Action Button Component
function ActionButton({ icon, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 bg-white border border-slate-200 hover:border-blue-200 text-slate-800 p-5 rounded-2xl font-bold transition-all hover:bg-blue-50 group hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-0.5"
    >
      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <span>{title}</span>
      <ChevronRight
        size={18}
        className="ml-auto text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
