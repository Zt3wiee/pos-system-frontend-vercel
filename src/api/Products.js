import { useEffect, useState } from "react";
import GlobalApi from "./GlobalApi";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      // const res = await GlobalApi.get("/products");
      const res = await GlobalApi.get(`/products?search=${search}`);
      setProducts(res.data.data);
      // console.log("Fetched products:", res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchProducts();
  // }, [search]);
   // 👇 ADD DEBOUNCE HERE (replace old useEffect)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);
  return { products, loading,search, setSearch, refetch: fetchProducts };
};


export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.post("/products", productData, {
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


export const updateProduct = async (productId, productData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.put(`/products/${productId}`,productData,{
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
}


export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await GlobalApi.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}