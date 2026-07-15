import { useEffect, useState } from "react";
import GlobalApi from "./GlobalApi"

//Get all reports
export const getAllReports = async () => {
        const res = await GlobalApi.get("/reports/daily");
        return res.data
}

//Monthly report
export const getMonthlyReport = async () => {
    const res = await GlobalApi.get("/reports/monthly");
    return res.data
}

//Top selling products
export const getTopProducts = async () => {
    const res = await GlobalApi.get("/reports/top-products");
    return res.data
    console.log(res.data)
}

// ✅ Orders (all sales)
export const getOrdersReport = async () => {
  const res = await GlobalApi.get("reports/orders");
  return res.data;
  console.log(res.data)
};

// ✅ Products
export const getProducts = async () => {
  const res = await GlobalApi.get("/products");
  return res.data;
  console.log(res.data)
};

// ✅ Categories (admin only)
export const getCategories = async () => {
  const res = await GlobalApi.get("/categories");
  return res.data;
  console.log(res.data)
};


//Fetch sales by date range 
export const useSummary =  () => {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await GlobalApi.get("/reports/summary");
        console.log(res.data);
        setSummary(res.data);
      }catch(error) {
      console.error("Error fetching categories:", error);
    }
    };
    fetchSummary();
  }, []);
  return summary;
};