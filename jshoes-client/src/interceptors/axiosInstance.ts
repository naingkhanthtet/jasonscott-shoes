import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// Request interceptor to attach headers or modify request configurations
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      // Redirect to login or handle authentication logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
