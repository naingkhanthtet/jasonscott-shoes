import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../interceptors/axiosInstance";
import useCsrfToken from "./useCsrfToken";
import { User, UserContext } from "./UserContext";
import Shoe from "../types/Shoe";

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
  const [backendFavorites, setBackendFavorites] = useState<Shoe[]>([]);
  const [backendCart, setBackendCart] = useState<Shoe[]>([]);
  const csrfToken = useCsrfToken();

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
      const { favorites, cart } = response.data;

      setUser((prev) => ({
        ...prev,
        favorites,
        cart,
      }));

      setBackendFavorites(favorites);
      setBackendCart(cart);

      Cookies.set("favorites", JSON.stringify(favorites));
      Cookies.set("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  };

  const syncUserData = useCallback(async () => {
    if (!user.isLoggedIn) return;

    const isCartDifferent =
      JSON.stringify(user.cart) !== JSON.stringify(backendCart);
    const isFavoritesDifferent =
      JSON.stringify(user.favorites) !== JSON.stringify(backendFavorites);

    if (isCartDifferent || isFavoritesDifferent) {
      try {
        await axiosInstance.post(
          "auth/sync/",
          {
            favorites: user.favorites,
            cart: user.cart,
          },
          {
            headers: {
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
          }
        );
        setBackendFavorites(user.favorites);
        setBackendCart(user.cart);
        console.log("Sync successful");
      } catch (err) {
        console.error("Sync failed", err);
      }
    }
  }, [
    user.isLoggedIn,
    user.favorites,
    user.cart,
    backendFavorites,
    backendCart,
    csrfToken,
  ]);

  // Debounce the sync operation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      syncUserData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [backendCart, backendFavorites, syncUserData]);

  const handleAddToCart = async (cartItem: Shoe, sync = true) => {
    const updatedCart = [...user.cart, { ...cartItem, quantity: 1 }];
    setUser((prev) => ({ ...prev, cart: updatedCart }));
    Cookies.set("cart", JSON.stringify(updatedCart));

    if (sync) syncUserData();
  };

  const handleRemoveFromCart = async (itemId: number, sync = true) => {
    const updatedCart = user.cart.filter((item) => item.id !== itemId);
    setUser((prev) => ({ ...prev, cart: updatedCart }));
    Cookies.set("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    if (sync) syncUserData();
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleAddToCart,
        handleRemoveFromCart,
        handleLogout,
        syncUserData,
      }}
    >
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};
