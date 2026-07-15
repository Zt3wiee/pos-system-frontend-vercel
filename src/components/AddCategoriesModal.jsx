import React, { useState } from "react";
import { createCategories } from "../api/Categories";

export default function AddCategoriesModal({ isOpen, onClose, onSuccess }) {
  const [category, setCategory] = useState({
    name: "",
  });
  if (!isOpen) return null; // Don't render if the modal is closed

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategories(category);
      if (onSuccess) {
        onSuccess(); // 🔥 tell parent to refresh
      }
      onClose();
      alert("Category created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create category.");
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      {/* Modal Container */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Add New Category</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="e.g., Electronics, Foods"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Brief description of the category..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-900 transition-colors"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
