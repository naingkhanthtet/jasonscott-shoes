import axiosInstance from "../interceptors/axiosInstance";
import { useState, useEffect } from "react";

const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axiosInstance.get("auth/csrf");
        setCsrfToken(response.data.csrfToken);
      } catch (err) {
        console.error("Failed to fetch csrf token", err);
      }
    };
    fetchCsrfToken();
  }, []);
  return csrfToken;
};

export default useCsrfToken;
