import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { updateCategory } from "../api/Categories";

export default function EditCategoriesModal({
  isOpen,
  onClose,
  categoryData,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name || "");
    }
  }, [categoryData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }
    try {
      // setLoading(true);

      await updateCategory(categoryData.id, {
        name,
      });

      // 🔥 Tell parent to refresh
      if (onSuccess) {
        onSuccess();
      }
      onClose();
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category.");
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div  onClick={(e) => e.target === e.currentTarget && onClose(false)}
     className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            Edit Category (Static View)
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-blue-700 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border dark:text-white dark:bg-gray-600  rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
              placeholder="e.g. Beverages"
            />
          </div>

          <div>
            <label className="block text-xs font-bold  text-slate-500 uppercase tracking-wider mb-2">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border dark:text-white dark:bg-gray-600  rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
              placeholder="Describe this category..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900 transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
