import { useState } from "react";
import { deleteProduct, useProducts } from "../../api/Products";
import AddProductModal from "../../components/AddProductModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import EditProductsModal from "../../components/EditProductsModal";
import { Search } from "lucide-react";
import SearchInput from "../../components/SearchInput";
import LoadingSpinnerAdmin from "../../components/LoadingSpinnerAdmin";

export default function InventoryPage() {
  const { products, loading,search, setSearch, refetch } = useProducts();

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme, setTheme] = useState("light");

  if (loading) {
    // return <LoadingSpinner theme={theme} />;
    return <LoadingSpinnerAdmin/>;
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        refetch(); // Refresh list after deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Error deleting product");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-600 overflow-hidden">
      <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Title */}
        <h2 className="font-bold text-lg text-slate-800 dark:text-white shrink-0">
          Product Inventory
        </h2>

        {/* Center: Search Bar (Flex-1 allows it to take up the remaining middle space safely) */}
        
          <SearchInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-slate-100 focus:bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
     

        {/* Right: Action Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors shrink-0"
        >
          Add Item
        </button>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase dark:bg-gray-950 dark:text-gray-300">
          <tr>
            <th className="px-6 py-3">SKU</th>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Stock Level</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.length === 0 ?(
             <tr>
                <td colSpan={7} className="h-64">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500 font-semibold dark:text-gray-400">
                      No products found
                    </p>
                  </div>
                </td>
              </tr>
          ):(
          products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
              <td className="px-6 py-4 font-mono text-sm dark:text-gray-300">{p.id}</td>
              <td className="px-6 py-4 font-medium dark:text-gray-300">{p.name}</td>
              <td
                className={`px-6 py-4 font-bold ${p.status === "Low Stock" ? "text-red-600" : "text-green-600"}`}
              >
                {p.stock} units
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setOpenEditModal(true);
                    }}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="text-red-600 font-semibold cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      {/* AddProductModal */}
      <AddProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onProductAdded={refetch}
      />
      {/* <EditProductsModal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}/> */}
      <EditProductsModal
        isOpen={!!selectedProduct}
        productData={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSave={refetch}
      />
    </div>
  );
}
