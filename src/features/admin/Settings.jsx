import { useState } from "react";
import { Store, DollarSign, Receipt, Printer, BellRing, Save, Undo2 } from "lucide-react";

export default function Settings() {
  // 1. Simple, separate state fields (Easy to read and change)
  const [shopName, setShopName] = useState("RetailOS Market");
  const [phone, setPhone] = useState("+855 23 999 888");
  const [address, setAddress] = useState("Phnom Penh, Cambodia");
  
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState("4100");
  const [enableKhqr, setEnableKhqr] = useState(true);
  
  const [taxRate, setTaxRate] = useState("10");
  const [taxType, setTaxType] = useState("Exclusive");
  const [invoicePrefix, setInvoicePrefix] = useState("INV-2026-");

  const [printerSize, setPrinterSize] = useState("80mm");
  const [autoPrint, setAutoPrint] = useState(true);
  const [lowStockLimit, setLowStockLimit] = useState("5");

  // 2. Clear function showing exactly how data is sent to your future backend
  const handleSaveAllSettings = () => {
    const dataToSend = {
      shop_name: shopName,
      phone_number: phone,
      address: address,
      base_currency: currency,
      exchange_rate: Number(exchangeRate),
      khqr_active: enableKhqr,
      tax_rate: Number(taxRate),
      tax_type: taxType,
      invoice_prefix: invoicePrefix,
      paper_size: printerSize,
      auto_print: autoPrint,
      low_stock_limit: Number(lowStockLimit)
    };

    console.log("Sending this simple object to Laravel API later:", dataToSend);
    alert("Settings saved locally! (Ready to link to your backend API next)");
  };

  return (
    <div className="min-h-screen rounded-xl dark:bg-zinc-900 dark:text-slate-300 bg-slate-50 p-6 text-slate-900 md:p-8">
      
      {/* Top Header Action Bar */}
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <Store size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Store Settings</h1>
            <p className="text-sm font-semibold text-slate-500">Configure your business profile, exchange rates, and rules.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            <Undo2 size={16} /> Reset
          </button>
          <button 
            onClick={handleSaveAllSettings}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/10 transition hover:bg-blue-700"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      {/* Main Settings Layout Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        
        {/* Left Side: Standard Forms Area */}
        <div className="space-y-6 xl:col-span-2">
          
          {/* Section 1: Shop Profile */}
          <section className="rounded-xl border border-slate-200 dark:bg-zinc-800 dark:border-zinc-600 dark:text-slate-300 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Store size={18} className="text-blue-600" />
              <h2 className="text-base dark:text-slate-300 font-black uppercase tracking-tight text-slate-900">Business Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Store Name</label>
                <input 
                  type="text" 
                  value={shopName} 
                  onChange={(e) => setShopName(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Contact Hotline</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Physical Address</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Currency Logic */}
          <section className="rounded-xl border border-slate-200 dark:bg-zinc-800 dark:border-zinc-600 dark:text-slate-300 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <DollarSign size={18} className="text-blue-600" />
              <h2 className="text-base dark:text-slate-300 font-black uppercase tracking-tight text-slate-900">Currency & Conversion</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Primary Counter Currency</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                >
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="KHR">KHR (៛) - Khmer Riel</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Local Exchange Rate ($1 = ?)</label>
                <div className="relative flex items-center">
                  <input 
                    type="number" 
                    value={exchangeRate} 
                    onChange={(e) => setExchangeRate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 bg-slate-50 pl-3 pr-12 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                  />
                  <span className="absolute right-3 font-mono text-xs font-bold text-slate-400">KHR</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-100 dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 bg-slate-50 p-4 md:col-span-2">
                <div>
                  <h4 className="text-sm dark:text-slate-300 font-bold text-slate-800">Enable Bakong KHQR QR-Codes</h4>
                  <p className="text-xs dark:text-slate-400 text-slate-400 font-medium">Generate standard dynamic payment codes at the cashier terminal screen.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input 
                    type="checkbox" 
                    checked={enableKhqr} 
                    onChange={(e) => setEnableKhqr(e.target.checked)}
                    className="peer sr-only" 
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Section 3: Tax Rules */}
          <section className="rounded-xl border border-slate-200 dark:bg-zinc-800 dark:border-zinc-600 dark:text-slate-300 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Receipt size={18} className="text-blue-600" />
              <h2 className="text-base dark:text-slate-300 font-black uppercase tracking-tight text-slate-900">Taxes & Compliance</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">VAT Rate (%)</label>
                <input 
                  type="number" 
                  value={taxRate} 
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Tax Setup</label>
                <select 
                  value={taxType} 
                  onChange={(e) => setTaxType(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                >
                  <option value="Exclusive">Tax Exclusive (Add at end)</option>
                  <option value="Inclusive">Tax Inclusive (Built into price)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Invoice Prefix</label>
                <input 
                  type="text" 
                  value={invoicePrefix} 
                  onChange={(e) => setInvoicePrefix(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: Hardware & Live Preview Sidebar */}
        <div className="space-y-6">
          
          {/* Section 4: Printer Customization */}
          <section className="rounded-xl border border-slate-200 dark:bg-zinc-800 dark:border-zinc-600 dark:text-slate-300 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Printer size={18} className="text-blue-600" />
              <h2 className="text-base dark:text-slate-300 font-black uppercase tracking-tight text-slate-900">Hardware Printer</h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Paper Width Size</label>
                <select 
                  value={printerSize} 
                  onChange={(e) => setPrinterSize(e.target.value)}
                  className="rounded-lg border dark:bg-zinc-700 dark:border-zinc-600 dark:text-slate-300 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
                >
                  <option value="80mm">Thermal Ticket Printer (80mm Standard)</option>
                  <option value="58mm">Mobile Receipt Printer (58mm Mini)</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider dark:text-slate-300 text-slate-800">Auto-Print Receipt</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Print instantly when order ends.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input 
                    type="checkbox" 
                    checked={autoPrint} 
                    onChange={(e) => setAutoPrint(e.target.checked)}
                    className="peer sr-only" 
                  />
                  <div className="peer h-5 w-9 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Section 5: Low Stock Safety */}
          <section className="rounded-xl border dark:bg-zinc-800 border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <BellRing size={18} className="text-blue-600" />
              <h2 className="text-base font-black uppercase dark:text-slate-300 tracking-tight text-slate-900">Stock Alerts</h2>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Global Low Stock Limit</label>
              <input 
                type="number" 
                value={lowStockLimit} 
                onChange={(e) => setLowStockLimit(e.target.value)}
                className="rounded-lg border border-slate-200 dark:bg-zinc-700 dark:text-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 dark:focus:bg-gray-900 focus:bg-white"
              />
            </div>
          </section>

          {/* Real-time Dynamic Live Terminal Context Preview */}
          <section className="rounded-xl bg-slate-900 p-5 text-white shadow-md">
            <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">Live Terminal Preview</h2>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Store Name:</span>
                <span className="font-bold text-slate-200">{shopName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Invoice:</span>
                <span className="font-bold text-blue-400">{invoicePrefix}0001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exchange Rate:</span>
                <span className="font-bold text-emerald-400">$1.00 = {exchangeRate} KHR</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}