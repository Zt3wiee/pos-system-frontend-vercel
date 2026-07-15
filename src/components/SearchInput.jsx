import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    // 1. Parent container pushes everything to the right
    <div className="flex w-full justify-end p-4">
      {/* 2. Your Search Bar Container */}
      <div className="w-full max-w-xl relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 
      group-focus-within:text-blue-500 transition-colors"
          size={20}
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full dark:bg-black dark:text-gray-300 bg-slate-100 focus:bg-white dark:focus:bg-black border border-slate-200 
      rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 
      outline-none focus:border-blue-500 focus:ring-2 
      focus:ring-blue-500/20 transition-all text-sm"
        />
      </div>
    </div>
  );
}
