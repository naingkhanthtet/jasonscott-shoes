import axios from "axios";

// const baseUrl = import.meta.env.VITE_LOCAL_BACKEND;
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${baseUrl}/api/token/refresh/`,
            {
              refresh: refreshToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const { access } = response.data;
          localStorage.setItem("access_token", access);
          error.config.headers["Authorization"] = `Bearer ${access}`;
          return axiosInstance.request(error.config);
        } catch (err) {
          console.error("Token refresh error", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert("Please log in again. Session expired.");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
