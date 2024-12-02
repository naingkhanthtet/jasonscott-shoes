import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: import.meta.env.VITE_LOCAL_BACKEND,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Origin: import.meta.env.VITE_FRONTEND_URL,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
