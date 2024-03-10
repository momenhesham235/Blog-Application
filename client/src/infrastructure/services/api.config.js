// config APi
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const authTokens = JSON.parse(localStorage.getItem("blog-token"));

  if (authTokens) {
    config.headers.Authorization = `Bearer ${authTokens}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
