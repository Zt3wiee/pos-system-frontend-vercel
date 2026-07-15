import { useEffect, useState } from "react";
import GlobalApi from "../api/GlobalApi";
import { createProduct } from "../api/Products";

export default function AddProductModal({ openModal, setOpenModal ,onProductAdded }) {
  const [form , setForm] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "", 
  })
  const [categories , setCategories] = useState([]);

  // Fetch categories when modal opens
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GlobalApi.get("/categories");
        setCategories(res.data.data);
        //set default category
        if (res.data.data.length > 0){
          setForm(prew => ({...prew, categoryId:res.data.data[0].id}))
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (openModal) fetchCategories();
  }, [openModal]);
  if (!openModal) return null;

  const handleChange = (e) => {
    const {name , value} = e.target;
    setForm(prev => ({...prev,[name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const payload = {
      name: form.name,
      category_id : form.categoryId,
      price: parseFloat(form.price),
      stock : parseInt(form.stock)
    }
    await createProduct(payload);
    setOpenModal(false);
     if (onProductAdded) onProductAdded(); // refresh product list
     alert("Create product succesfull")
    //reset form
    setForm({
       name: "",
        price: "",
        stock: "",
        categoryId: categories.length > 0 ? categories[0].id : "",
    })
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
    
  }

  return (
    //👉 “Close modal ONLY if user clicks outside”
    <div
      onClick={(e) => e.target === e.currentTarget && setOpenModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-md transition-all"
    >
      <div className="relative w-[440px] rounded-3xl bg-white/90 dark:bg-slate-900 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-500 mb-1">
              New Entry
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
              Add Product
            </h2>
          </div>
          <button
            onClick={() => setOpenModal(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Fields */}
        <form onSubmit={handleSubmit} >
        <div className="space-y-5 mb-10">

          {/* Product Name */}
          <div className="group">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Minimalist Watch"
              value={form.name}
              onChange={handleChange}
              className="w-full dark:text-slate-300 bg-slate-50 border dark:bg-slate-700 border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="group">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                className="w-full bg-slate-50 border dark:text-slate-300 dark:bg-slate-700 border-slate-200 rounded-xl px-4 py-3 text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Stock */}
            <div className="group">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                value={form.stock}
                onChange={handleChange}
                className="w-full bg-slate-50 border dark:text-slate-300 dark:bg-slate-700 border-slate-200 rounded-xl px-4 py-3 text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
              />
            </div>
          </div>

          {/* Category */}
          <div className="group">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Category
            </label>
            <div className="relative">
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full bg-slate-50 border dark:text-slate-300 dark:bg-slate-700 border-slate-200 rounded-xl px-4 py-3 text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select category</option>
                {categories && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
       

        {/* Footer */}
        <div className="flex gap-3">
          <button
            onClick={() => setOpenModal(false)}
            className="flex-1 px-6 py-3.5 dark:text-slate-300 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all"
          >
            Cancel
          </button>
          <button className="flex-[1.5] px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide uppercase bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 dark:hover:bg-indigo-600 transition-all active:scale-[0.98]">
            Save Product
          </button>
        </div>
         </form>
      </div>
    </div>
  );
}