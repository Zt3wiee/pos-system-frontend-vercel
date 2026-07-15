import GlobalApi from "./GlobalApi"

export const getProducts = async () => {
    try {
        const res = await GlobalApi.get("/products");
        console.log("Fetched products:", res.data.data); // Debug log
        return res.data.data;
    }catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// SAVE SALE
export const chargeOrder = async (data) => {
  const res = await GlobalApi.post("/sales", data);
  return res.data;
};