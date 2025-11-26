import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add auth token automatically
api.interceptors.request.use((config) => {
  // Use vendorToken if it exists, otherwise fallback to user token
  const vendorToken = localStorage.getItem("vendorToken");
  const userToken = localStorage.getItem("token");

  if (vendorToken) {
    config.headers.Authorization = `Bearer ${vendorToken}`;
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default api;
