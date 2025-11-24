import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Check for admin token first
  const adminToken = localStorage.getItem("token");
  // Then check for user token
  const userToken = localStorage.getItem("userToken");
  
  const token = adminToken || userToken;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;