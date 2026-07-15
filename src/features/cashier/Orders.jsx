import React, { useState } from "react";
import Order from "../../api/Order";
import LoadingSpinner from "../../components/LoadingSpinner";
import DetailOrderModal from "../../components/DetailOrderModal";
import {
  Search,
  Filter,
  Printer,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const OrdersPage = () => {
  const { orders, loading, search, setSearch } = Order();
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Helper to handle modal opening
  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setOpenDetail(true);
  };

  if (loading) return <LoadingSpinner theme="dark" />;

  return (
    <div className=" flex flex-col h-full bg-[#0a0a0c] text-slate-300 rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
      {/* 1. GLASS HEADER & SEARCH */}
      <div className="p-8 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Order Ledger
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase ml-4">
            Terminal Session • 2026
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-white"
            />
          </div>
          <button className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 p-3 rounded-2xl transition-all group">
            <Filter
              size={18}
              className="text-slate-400 group-hover:text-blue-400"
            />
          </button>
        </div>
      </div>

      {/* 2. DATA TABLE */}
      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-white/[0.01] text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-8 py-5 border-b border-white/5">Order ID</th>
              <th className="px-8 py-5 border-b border-white/5">Timestamp</th>
              <th className="px-8 py-5 border-b border-white/5">Operator</th>
              <th className="px-8 py-5 border-b border-white/5">Quantity</th>
              <th className="px-8 py-5 border-b border-white/5">Net Amount</th>
              <th className="px-8 py-5 border-b border-white/5">Status</th>
              <th className="px-8 py-5 border-b border-white/5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-64">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500 font-semibold">
                      No orders found
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              orders?.map((order) => (
                <tr
                  key={order.id}
                  className="group hover:bg-blue-500/[0.02] transition-colors"
                >
                  <td className="px-8 py-5">
                    <span className="font-mono text-sm text-blue-500 font-black tracking-tighter">
                      #{order.id}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={14} className="text-slate-600" />
                      <span className="text-sm font-medium">
                        {order.created_at}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-200">
                      {order.user?.name}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {order.sale_items_count}{" "}
                    <span className="text-[10px] uppercase ml-1">Items</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-lg font-black text-white">
                      ${order.total_amount}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider">
                        Settled
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenDetail(order)}
                        className="p-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/5"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-white/[0.03] text-slate-500 rounded-xl hover:bg-white/[0.1] hover:text-white transition-all">
                        <Printer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. FOOTER / PAGINATION */}
      <div className="p-6 border-t border-white/5 bg-white/[0.01] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
          Total Transactions:{" "}
          <span className="text-slate-400">{orders?.length || 0}</span>
        </p>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs font-bold hover:bg-white/[0.08] disabled:opacity-30 transition-all">
            <ChevronLeft size={14} /> Previous
          </button>
          <div className="px-4 text-xs font-black text-blue-500">01 / 12</div>
          <button className="flex items-center gap-1 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs font-bold hover:bg-white/[0.08] transition-all">
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {openDetail && (
        <DetailOrderModal
          order={selectedOrder}
          onClose={() => setOpenDetail(false)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
