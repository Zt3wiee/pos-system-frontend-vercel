import React, { useState } from "react";
// Added Trash2 icon
import { Plus, LayoutGrid, Edit3, Trash2, Search } from "lucide-react";
import { deleteCategory, useCategories } from "../../api/Categories";
import LoadingSpinner from "../../components/LoadingSpinner";
import AddCategoriesModal from "../../components/AddCategoriesModal";
import EditCategoriesModal from "../../components/EditCategoriesModal";
import LoadingSpinnerAdmin from "../../components/LoadingSpinnerAdmin";
import SearchInput from "../../components/SearchInput";

export default function Categories() {
  // Destructure a delete function if your hook provides it,
  // or use refreshCategories after an API call
  const { categories, loading, search, setSearch, refreshCategories } =
    useCategories();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (loading) return <LoadingSpinnerAdmin />;

  // <LoadingSpinner theme="light" />;

  const handleAddClick = () => {
    setSelectedCategory(null);
    setOpenAddModal(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  // --- NEW DELETE HANDLER ---
  const handleDeleteClick = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        // Replace this with your actual API logic if not in the hook
        await deleteCategory(id);
        refreshCategories(); // Refresh list after deletion
      } catch (error) {
        console.error("Failed to delete category:", error);
        alert("Error deleting category");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white rounded-xl">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LayoutGrid size={24} className="text-teal-600" />
            Product Categories
          </h1>
        </div>

        <div className="flex-1 max-w-xl relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={20}
          />
          <SearchInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-slate-100 focus:bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>

        <div className="w-full sm:w-auto flex items-center">
          <button
            onClick={handleAddClick}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full h-64 flex items-center justify-center">
            <p className="text-slate-500 font-semibold dark:text-gray-400">
              No categories found
            </p>
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white border dark:bg-zinc-800 border-slate-200 p-5 rounded-2xl hover:shadow-xl transition-all relative"
            >
              {/* ACTION BUTTONS (Top Right) */}
              <div className="absolute top-4 right-4 flex gap-1">
                {/* EDIT */}
                <button
                  onClick={() => handleEditClick(cat)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                  title="Edit Category"
                >
                  <Edit3 size={18} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDeleteClick(cat.id, cat.name)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  title="Delete Category"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-14 h-14 ${cat.bgColor || "bg-slate-100"} rounded-2xl flex items-center justify-center text-3xl shadow-sm`}
                >
                  {cat.emoji || "📁"}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-slate-400 text-xs font-medium uppercase">
                    {cat.products_count || 0} Products
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      <AddCategoriesModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={refreshCategories}
      />

      <EditCategoriesModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        categoryData={selectedCategory}
        onSuccess={refreshCategories}
      />
    </div>
  );
}
