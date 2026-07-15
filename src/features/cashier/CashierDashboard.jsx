import React from 'react';
import { Search, ShoppingCart, User, LogOut, Tag, Plus, Minus, Trash2 } from 'lucide-react';

export default function CashierDashboard() {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. Slim Navigation Sidebar */}
      <aside className="w-20 bg-indigo-700 flex flex-col items-center py-8 space-y-8 text-white">
        <div className="bg-white/20 p-3 rounded-xl">
          <ShoppingCart size={28} />
        </div>
        <nav className="flex-1 space-y-4">
          <button className="p-3 hover:bg-white/10 rounded-xl transition-colors"><User size={24} /></button>
          <button className="p-3 hover:bg-white/10 rounded-xl transition-colors"><Tag size={24} /></button>
        </nav>
        <button className="p-3 hover:bg-red-500 rounded-xl transition-colors mt-auto">
          <LogOut size={24} />
        </button>
      </aside>

      {/* 2. Main Product Area */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Point of Sale</h1>
            <p className="text-slate-500 text-sm">March 12, 2026 | Station #04</p>
          </div>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products or scan barcode..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </header>

        {/* Categories / Quick Actions */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['All Items', 'Beverages', 'Snacks', 'Fresh Produce', 'Bakery'].map((cat, i) => (
            <button key={i} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 hover:border-indigo-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="h-32 bg-slate-100 rounded-lg mb-3 flex items-center justify-center">
                <Tag className="text-slate-300" size={32} />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">Premium Coffee Beans</h3>
              <p className="text-indigo-600 font-bold mt-1">$14.99</p>
            </div>
          ))}
        </div>
      </main>

      {/* 3. Right Side: Order Summary */}
      <section className="w-96 bg-white border-l border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Current Order <span className="bg-slate-100 text-xs px-2 py-1 rounded-full text-slate-500">3 Items</span>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Cart Item Placeholder */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-medium text-sm">Espresso Roast</span>
              <span className="text-xs text-slate-400">$4.50</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded bg-slate-100"><Minus size={14}/></button>
              <span className="font-bold text-sm">2</span>
              <button className="p-1 rounded bg-slate-100"><Plus size={14}/></button>
              <span className="font-bold text-sm ml-2">$9.00</span>
            </div>
          </div>
        </div>

        {/* Totals & Checkout */}
        <div className="p-6 bg-slate-50 space-y-3">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>$42.50</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Tax (8%)</span>
            <span>$3.40</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-3 border-t border-slate-200">
            <span>Total</span>
            <span className="text-indigo-600">$45.90</span>
          </div>
          
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl mt-4 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
            Complete Checkout
          </button>
        </div>
      </section>

    </div>
  );
}