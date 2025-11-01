import axios from "axios";

const api = axios.create({
  baseURL: "https://api-sql-pdlt.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    // tenta pegar do sessionStorage primeiro
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    console.log("Token do interceptor:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
