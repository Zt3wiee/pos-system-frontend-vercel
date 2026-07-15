import { useEffect, useState } from "react";
import GlobalApi from "./GlobalApi";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      // const res = await GlobalApi.get("/categories");
      const res = await GlobalApi.get(`/categories?search=${search}`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCategories();
    },300);

    return () => clearTimeout(timeout);
  }, [search]);

  return { categories, search, setSearch, loading , refreshCategories:fetchCategories };
};

export const createCategories = async (categoryData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.post("/categories", categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId,categoryData)=>{
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.put(`/categories/${categoryId}`,categoryData,{
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log("Category updated successfully:", res.data);
    return res.data;
  }catch (error) {
    console.error("Error updating category:", error);
    throw error; // Re-throw to handle in UI
}
}


export const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }
    });
    console.log("Category deleted successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}