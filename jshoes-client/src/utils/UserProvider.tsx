import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../interceptors/axiosInstance";
import useCsrfToken from "./useCsrfToken";
import { User, UserContext } from "./UserContext";

const defaultUser = {
  isLoggedIn: false,
  username: "",
  userid: 0,
  favorites: [],
  cart: [],
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const csrfToken = useCsrfToken();

  // check authentication status
  // set username, userid, isLoggedIn status
  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get("/auth/user/");
      setUser((prev) => ({
        ...prev,
        isLoggedIn: response.data.isAuthenticated,
        username: response.data.username,
        userid: response.data.userid,
      }));
    } catch {
      setUser((prev) => ({
        ...prev,
        isLoggedIn: false,
        username: "",
        userid: 0,
      }));
    } finally {
      setIsInitialized(true);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/shop/user-data/");
      // const { favorites, cart } = response.data;

      setUser((prev) => ({
        ...prev,
        favorites: response.data.favorites,
        cart: response.data.cart,
      }));

      Cookies.set("favorites", JSON.stringify(response.data.favorites));
      Cookies.set("cart", JSON.stringify(response.data.cart));
      setHasFetchedData(true);
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  };

  const syncUserData = async () => {
    const sanitizedFavorites = user.favorites.flat();
    const sanitizedCart = user.cart.flat();

    if (user.isLoggedIn && hasFetchedData) {
      try {
        const response = await axiosInstance.post(
          "auth/sync/",
          {
            favorites: sanitizedFavorites,
            cart: sanitizedCart,
          },
          {
            headers: {
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Sync successful:", response.data);
      } catch (err) {
        console.error("Sync failed", err);
        console.log(user.favorites);
        console.log(csrfToken);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("auth/logout");
      if (response.status === 200) {
        setUser(defaultUser);
        Cookies.remove("favorites");
        Cookies.remove("cart");
        window.location.reload();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchUserData();
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (user.isLoggedIn && hasFetchedData) {
      syncUserData();
    }
  }, [user.isLoggedIn, hasFetchedData]);

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout, syncUserData }}>
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};
