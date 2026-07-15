import React, { useEffect, useState } from "react";
import { useCategories } from "../api/Categories";
import { updateProduct } from "../api/Products";

export default function EditProductsModal({ isOpen, onClose, productData,onSave }) {

  // ✅ get categories correctly
  const { categories } = useCategories();

  // ✅ form state (controlled)
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  // ✅ fill form when editing
  useEffect(() => {
    if (productData) {
      setForm({
        name: productData.name || "",
        price: productData.price || "",
        stock: productData.stock || "",
        categoryId: productData.categoryId || "",
      });
    }
  }, [productData]);

  //✅ handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Product:", form);
    try {
        await updateProduct(productData.id,form);
         alert("Product updated successfully!");
    }catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }

    if (onSave) onSave(form); // send to parent
    onClose();
  };
    if (!isOpen) return null;

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose(false)}
     className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-slate-300">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2.5 dark:bg-slate-700 dark:text-slate-300 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="rounded-lg border p-2.5 dark:bg-slate-700 dark:text-slate-300 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="rounded-lg border p-2.5 dark:bg-slate-700 dark:text-slate-300 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
             {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2.5 dark:bg-slate-700 dark:text-slate-300 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
