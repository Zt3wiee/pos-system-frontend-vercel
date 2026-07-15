import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/AuthApi";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react"; // Added icons for that premium feel

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await login(formData);
      const role = res?.user?.role;

      // Logic: Save token securely (Implementation depends on your Auth provider)
      // localStorage.setItem("token", res.token);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "cashier") {
        navigate("/cashier/sales");
      }
    } catch (err) {
      setError("Authentication failed. Check your credentials.", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] relative overflow-hidden">
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="max-w-md w-full mx-4 relative">
        {/* --- MAIN CARD (GLASSMORPHISM) --- */}
        <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/5 rounded-[32px] shadow-2xl p-10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl shadow-[0_0_30px_rgba(37,99,235,0.3)] mb-6 transform -rotate-3">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Retail<span className="text-blue-500">OS</span></h2>
            <p className="text-slate-500 font-medium text-sm mt-2 tracking-widest uppercase">Secure Terminal Access</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-shake">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="operator@system.com"
                  className="w-full bg-white/[0.03] text-white px-12 py-4 rounded-2xl border border-white/5 focus:border-blue-500/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-slate-700 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] text-white px-12 py-4 rounded-2xl border border-white/5 focus:border-blue-500/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-blue-600 transition-all" />
                <span className="group-hover:text-slate-300 transition-colors">Remember Session</span>
              </label>
              <a href="#" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">Recover Access</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden group py-4 rounded-2xl font-black text-white transition-all shadow-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Authorizing...
                  </>
                ) : (
                  "Initialize Session"
                )}
              </div>
              {/* Button Shine Effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
            Terminal ID: <span className="text-slate-500">POS-NX-2026</span> • v2.4.0
          </p>
        </div>
      </div>
    </div>
  );
}
