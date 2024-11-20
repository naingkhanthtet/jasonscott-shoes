import axiosInstance from "../interceptors/axiosInstance";

export const isUserLoggedIn = (): boolean => {
  const csrfElement = document.getElementById("csrf-token") as HTMLInputElement;
  // return boolean value based on csrf value
  return !!(csrfElement && csrfElement.value);
};

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/user/", {
      withCredentials: true,
    });
    return response.data;
  } catch {
    return false;
  }
};
