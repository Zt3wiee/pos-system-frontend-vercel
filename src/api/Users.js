import { useEffect, useState } from "react";
import GlobalApi from "./GlobalApi";


// Custom hook to fetch current user data like name, email, role, etc. (for profile display)
export const useUsers = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await GlobalApi.get("/user");
        // console.log("Fetched users:", res.data); // Debug log
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, []);
  return users;
};
//i use this to display all users in the admin user management page
export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAllUsers = async () => {
    try {
      // const res = await GlobalApi.get("/users");
      const res = await GlobalApi.get(`/users?search=${search}`);
      console.log("Fetched all users:", res.data);
      setAllUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
     fetchAllUsers();
    },300);
    return () => clearTimeout(timeout);
  }, [search]);
  return { allUsers, loading, search, setSearch, refetch: fetchAllUsers };
};




//create user
export const createUser = async (userData) => {
  // FRONTEND validation
  if (!userData.email.includes("@")) throw new Error("Invalid email");
  if (userData.password.length < 6) throw new Error("Password too short");
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.post("/users", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log("User created successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw to handle in UI
  }
};


//update user
export const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.put(`/users/${userId}`,userData,{
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log("User updated successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Re-throw to handle in UI
  }
};


//delete user
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.delete(`/users/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }
    });
    console.log("User deleted successfully:", res.data);
    return res.data;
  }catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}