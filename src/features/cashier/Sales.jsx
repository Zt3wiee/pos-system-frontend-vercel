import React, { useEffect, useState, useMemo } from "react";
import { getProducts, chargeOrder } from "../../api/Sales";
import {
  Search,
  Trash2,
  Plus,
  Minus,
  X,
  CreditCard,
  Box,
  Zap,
  ShoppingCart,
  Loader2,
} from "lucide-react";

const TerminalPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- ADDED FUNCTION: HANDLE CHARGE ---
  const handleCharge = async () => {
    if (cart.length === 0) return;

    setIsLoading(true);
    try {
      const data = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.qty,
        })),
        subtotal,
        tax,
        total,
      };

      await chargeOrder(data);
      alert("Order completed successfully!");
      setCart([]); // Clear cart after success
    } catch (error) {
      console.error("Charge error:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // PRODUCT LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      return [...prev, { ...product, price: Number(product.price), qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    return { subtotal: sub, tax: sub * 0.1, total: sub * 1.1 };
  }, [cart]);

  return (
    <div className="h-175 bg-[#050505] text-slate-300 p-4 flex gap-4 overflow-hidden font-sans ">
      {/* LEFT COLUMN: PRODUCT EXPLORER */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* TOP BENTO CARD: SEARCH */}
        <div className="bg-[#111113] border border-white/5 rounded-[24px] p-4 flex items-center gap-4 shadow-2xl">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Quick Search (e.g. 'Latte' or scan barcode)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <div className="hidden md:flex flex-col items-end px-4 border-l border-white/10">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Operator
            </span>
            <span className="text-sm font-bold text-white">Active Session</span>
          </div>
        </div>

        {/* MAIN BENTO CARD: PRODUCT GRID */}
        <div className="flex-1 bg-[#111113] border border-white/5 rounded-[32px] p-6 overflow-y-auto custom-scrollbar shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="relative overflow-hidden bg-white/[0.02] border border-white/5 p-5 rounded-[24px] hover:bg-blue-600 group transition-all active:scale-95 text-left flex flex-col justify-between h-40 shadow-lg"
              >
                <div className="flex justify-between items-start">
                   <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white/20 group-hover:text-white transition-all">
                     <Box size={20} />
                   </div>
                   <span className="text-[10px] font-black text-blue-500 group-hover:text-white transition-colors bg-blue-500/10 group-hover:bg-white/10 px-2 py-1 rounded-lg uppercase">In Stock</span>
                </div>
                <div>
                  <p className="font-black text-white uppercase tracking-tight text-sm leading-tight group-hover:text-white transition-colors">{product.name}</p>
                  <p className="text-blue-500 group-hover:text-white font-mono font-black mt-1 text-lg transition-colors">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </button>
            ))} */}
            {productsLoading ? (
              <div className="col-span-full flex justify-center items-center h-[calc(100vh-220px)] w-full">
                <Loader2 className="animate-spin text-blue-500" size={40} />
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="relative overflow-hidden bg-white/[0.02] border border-white/5 p-5 rounded-[24px] hover:bg-gray-800 group transition-all active:scale-95 text-left flex flex-col justify-between h-40 shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                      <Box size={20} />
                    </div>

                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg uppercase">
                      In Stock
                    </span>
                  </div>

                  <div>
                    <p className="font-black text-white uppercase tracking-tight text-sm leading-tight">
                      {product.name}
                    </p>

                    <p className="text-blue-500 font-mono font-black mt-1 text-lg">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-500 font-bold">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: THE CHECKOUT GLASS-CARD */}
      <div className="w-[420px] bg-[#111113]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
              <ShoppingCart size={20} />
            </div>
            <h2 className="font-black text-white uppercase tracking-widest text-sm">
              Cart
            </h2>
          </div>
          <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {cart.length} Items
          </span>
        </div>

        {/* CART ITEMS AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <Zap size={60} className="mb-4 text-slate-500" />
              <p className="text-xs font-black uppercase tracking-[0.3em]">
                Standby Mode
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center font-black text-blue-500 border border-white/5">
                  {item.qty}x
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm uppercase truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="p-1.5 hover:text-red-500 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="p-1.5 hover:text-blue-500 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RECEIPT FOOTER */}
        <div className="p-4 bg-black/40 border-t border-white/10 rounded-t-[32px]">
          <div className="space-y-2 mb-7">
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 tracking-tighter">
              <span>Subtotal</span>
              <span className="text-white font-mono">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 tracking-tighter">
              <span>Sales Tax (10%)</span>
              <span className="text-white font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">
                  Payable Amount
                </span>
                <span className="text-5xl font-black text-white tracking-tighter font-mono">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCharge}
            disabled={cart.length === 0 || isLoading}
            className="w-full relative group bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-6 rounded-2xl transition-all active:scale-[0.98] overflow-hidden shadow-[0_20px_40px_rgba(37,99,235,0.2)] flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm "
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <CreditCard size={20} />
            )}
            {isLoading ? "Processing..." : "Charge & Print"}

            {/* Hover Glow Effect */}
            {!isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
