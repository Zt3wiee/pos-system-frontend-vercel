import { useState } from "react";
import { deleteUser, useAllUsers } from "../../api/Users";
import LoadingSpinner from "../../components/LoadingSpinner";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../../components/EditUserModal";
import { Search } from "lucide-react";
import LoadingSpinnerAdmin from "../../components/LoadingSpinnerAdmin";
import SearchInput from "../../components/SearchInput";


export default function UserManagementPage() {
  const { allUsers, loading, search, setSearch, refetch  } = useAllUsers();
  const [openModal, setOpenModal] = useState(false);
  const [ selectedUser, setSelectedUser] = useState(false);


  if (loading) { 
    // return <LoadingSpinner theme="light"/> 
    return <LoadingSpinnerAdmin />
    }
  // handle delete with comfirmation
  const handleDelete = async (userId,name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteUser(userId);
        refetch();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-600 overflow-hidden">
      <div className="p-4 md:p-6 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-lg text-slate-800 dark:text-white">Staff Accounts</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Manage store personnel and access levels</p>
        </div>

        <div className="w-full lg:flex-1 lg:max-w-xl relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={20}
          />
          <SearchInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-slate-100 focus:bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>

        <button  onClick={() => {
          console.log("Opening Add User Modal")
          setOpenModal(true)
        }}
        className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700">
          + Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-[650px] w-full text-left">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase dark:bg-gray-950 dark:text-gray-300">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            {/* <th className="px-6 py-3">Status</th> */}
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-zinc-600">
          {allUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-64">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500 font-semibold">
                      No users found
                    </p>
                  </div>
                </td>
              </tr>
          ) : (
          allUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-300">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  user.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <button 
                  onClick={() => {
                    // console.log("Selected user for editing:", user);
                    setSelectedUser(user);
                  }}
                  className="text-blue-600 hover:underline font-semibold mr-4">Edit</button>
                <button onClick={() => handleDelete(user.id,user.name)}
                className="text-gray-400 hover:text-red-600 font-semibold">Delete</button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      </div>
        {/* Modal */}
      <AddUserModal openModal={openModal} setOpenModal={setOpenModal} onUserCreated={refetch}/>
      <EditUserModal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} user={selectedUser} onUserUpdated={refetch}/>
    </div>
  );
}