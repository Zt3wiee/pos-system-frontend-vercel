import axios from "axios";

const GlobalApi = axios.create({
  baseURL: "https://pos-system-backend-render.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Add token automatically
GlobalApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default GlobalApi;