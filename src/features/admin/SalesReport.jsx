import React, { useEffect, useState } from "react";
import {
  getOrdersReport,
  getTopProducts,
  useSummary,
} from "../../api/SaleReports";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  Download,
  BarChart3,
  Layers,
} from "lucide-react";

export default function SalesReport() {
  const [orders, setOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const summary = useSummary();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRes = await getOrdersReport();
        setOrders(ordersRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setOrdersLoading(false);
      }
    };

    const fetchTopProducts = async () => {
      try {
        const topRes = await getTopProducts();
        setTopProducts(topRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setTopProductsLoading(false);
      }
    };

    fetchOrders();
    fetchTopProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-slate-900 dark:text-white p-6 md:p-10 font-sans rounded-xl">
      {/* --- TOP NAVIGATION / HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-3xl font-black tracking-tight uppercase">
              Analytics
            </h2>
          </div>
          <p className="text-slate-400 font-medium text-sm ml-4">
            Monitoring Store Performance • 2026
          </p>
        </div>

        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl dark:shadow-gray-800">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* --- KEY METRICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ">
        <StatCard
          title="Revenue Today"
          value={`$${summary?.todayRevenue || 0}`}
          icon={<DollarSign className="text-blue-600" />}
        />
        <StatCard
          title="Orders Today"
          value={summary?.todayOrders || 0}
          icon={<ShoppingBag className="text-indigo-600" />}
        />
        <StatCard
          title="Monthly Orders"
          value={summary?.monthOrders || 0}
          icon={<Layers className="text-purple-600" />}
        />
        {/* <StatCard title="Monthly Revenue" value={`$${summary?.monthRevenue || 0}`} icon={<TrendingUp className="text-emerald-600" />} />
        <StatCard title="Total Volume" value={summary?.monthOrders || 0} icon={<Layers className="text-purple-600" />} />
        <StatCard title="Yearly Revenue" value={`$${summary?.yearRevenue || 0}`} icon={<TrendingUp className="text-yellow-600" />}  /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* --- MAIN TRANSACTIONS TABLE --- */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={20} className="text-blue-600" />
            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">
              Recent Sales
            </h3>
          </div>

          <div className="bg-white dark:bg-zinc-800 border-2 border-slate-50 dark:border-zinc-600 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-100/50">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] font-black">
                <tr>
                  <th className="py-5 px-8">ID</th>
                  <th className="py-5 px-8">Cashier</th>
                  <th className="py-5 px-8">Items</th>
                  <th className="py-5 px-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ordersLoading ? (
                  <tr>
                    <td
                      className="py-8 px-8 text-slate-400 dark:text-slate-500 font-bold"
                      colSpan="4"
                    >
                      Loading recent sales...
                    </td>
                  </tr>
                ) : orders.length > 0 ? (
                  orders.slice(0, showAll ? orders.length : 4).map((o) => (
                    <tr
                      key={o.id}
                      className="group hover:bg-blue-50/30 dark:hover:bg-zinc-900 transition-all cursor-default"
                    >
                      <td className="py-5 px-8 font-mono text-blue-600 font-bold">
                        #{o.id}
                      </td>
                      <td className="py-5 px-8 font-extrabold text-slate-700 dark:text-slate-300">
                        {o.user?.name}
                      </td>
                      <td className="py-5 px-8 text-slate-400 font-medium dark:text-slate-300">
                        {o.sale_items_count} units
                      </td>
                      <td className="py-5 px-8 text-right font-black text-slate-900 text-lg dark:text-white">
                        ${o.total_amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="py-8 px-8 text-slate-400 dark:text-slate-500 font-bold"
                      colSpan="4"
                    >
                      No recent sales found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {orders.length > 6 && (
              <div className="flex justify-center m-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                  {showAll ? "Show Less" : "See More"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- TOP PRODUCTS WITH BOLD PROGRESS BARS --- */}
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter mb-6 dark:text-white">
            Hot Sellers
          </h3>
          <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl shadow-blue-200/20">
            <div className="space-y-8">
              {topProductsLoading ? (
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Loading hot sellers...
                </p>
              ) : topProducts.length > 0 ? (
                topProducts.map((p, i) => {
                  const max = topProducts[0]?.total_quantity || 1; // prevent division by zero
                  const width = (p.total_quantity / max) * 100;
                  return (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-black uppercase tracking-wider">
                          {p.product?.name}
                        </span>
                        <span className="text-xs font-mono text-blue-400 dark:text-blue-300">
                          {p.total_quantity} sold
                        </span>
                      </div>
                      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all duration-1000 group-hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  No top products found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CUSTOM STAT CARD COMPONENT ---
function StatCard({ title, value, icon }) {
  return (
    <div className="relative overflow-hidden group bg-white dark:bg-zinc-800 border-3 border-slate-100 p-6 rounded-[28px] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 ">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-50 dark:bg-zinc-300 rounded-2xl group-hover:bg-blue-50 transition-colors">
          {icon}
        </div>
        <ArrowUpRight
          size={18}
          className="text-slate-300 group-hover:text-blue-500 transition-all"
        />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-[0.15em] mb-1">
          {title}
        </p>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </h2>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-all" />
    </div>
  );
}
