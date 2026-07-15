import { useState } from "react";
import { createUser } from "../api/Users";

export default function AddUserModal({ openModal, setOpenModal, onUserCreated }) {
 
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "cashier"
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value });
  }
   // name : jessy, email :    , password : jessy1234, role : cashier

  const handleSubmit = async (e) => {
    e.preventDefault();
     // console.log("Creating user with details:", { name, email, password, role });
      try{
        await createUser(data);
        await onUserCreated(); // Refresh user list in parent component
        setOpenModal(false);
        alert("User created successfully!");
      }
      catch (error) {
        console.error("Error creating user:", error);
        alert("Failed to create user.");
      }
    };


     if (!openModal) return null;
  return (
    <div onClick={(e) => e.target === e.currentTarget && setOpenModal(false)}
    className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Container: Increased width to 500px and added smoother animations */}
      <div className="bg-white rounded-2xl dark:bg-gray-800 w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header Section with Icon */}
        <div className="bg-slate-50 dark:bg-gray-800 px-8 py-6 border-b border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Create New Account
            </h2>
            <p className="text-sm text-gray-500">
              Assign roles and permissions to staff.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Form Group: Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Try Songheng"
              value={data.name}
              onChange={handleChange}
              name="name"
              className="w-full border dark:bg-gray-600 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-800"
            />
          </div>

          {/* Form Group: Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1 dark:text-gray-300">
              Work Email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={data.email}
              onChange={handleChange}
              name="email"
              className="w-full border dark:bg-gray-600 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-800"
            />
          </div>
          {/* Form Group: Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={data.password}
              onChange={handleChange}
              name="password"
              className="w-full border dark:bg-gray-600 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Form Group: Role Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1 dark:text-gray-300">
              System Role
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border dark:bg-gray-600 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer text-gray-800"
                value={data.role}
                onChange={handleChange}
                name="role"
              >
                <option value="cashier">Cashier (Standard Access)</option>
                <option value="admin">Admin (Full Control)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg dark:shadow-blue-900 shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
