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
      console.log("Full user response:", response.data);
      setUser((prev) => ({
        ...prev,
        isLoggedIn: response.data.isAuthenticated,
        username: response.data.username,
        userid: response.data.userid,
      }));

      // will fetch user data if the user is authenticated
      if (response.data.isAuthenticated) {
        await fetchUserData();
      }
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        console.warn("User is not authenticated");
      } else {
        console.error("Error checking authentication status:", err);
      }
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
      const response = await axiosInstance.get("/auth/user-data/");
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
    // cancel the sync function if a user is not logged in
    if (!user.isLoggedIn) return;

    // compare the user value and state values
    const isCartDifferent =
      JSON.stringify(user.cart) !== JSON.stringify(backendCart);
    const isFavoritesDifferent =
      JSON.stringify(user.favorites) !== JSON.stringify(backendFavorites);

    // sync if the values are different
    if (isCartDifferent || isFavoritesDifferent) {
      try {
        await axiosInstance.post(
          "/auth/sync/",
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

  /*
  Cart action methods
  */
  // add to cart function for both registered and unregistered
  const handleAddToCart = async (cartItem: Shoe) => {
    // const updatedCart = [...user.cart, { ...cartItem, quantity: 1 }];
    const cartCookies = JSON.parse(Cookies.get("cart") || "[]");
    // avoid cart duplicates
    const isAlreadyInCart = cartCookies.some(
      (shoe: Shoe) => shoe.id === cartItem.id
    );

    const updatedCart = isAlreadyInCart
      ? cartCookies
      : [...user.cart, { ...cartItem }];
    setUser((prev) => ({ ...prev, cart: updatedCart }));
    Cookies.set("cart", JSON.stringify(updatedCart));

    await syncUserData();
  };

  // remove from cart for both registered and unregistered
  const handleRemoveFromCart = async (itemId: number) => {
    const cartCookies = JSON.parse(Cookies.get("cart") || "[]");

    const updatedCart = cartCookies.filter((shoe: Shoe) => shoe.id !== itemId);
    setUser((prev) => ({ ...prev, cart: updatedCart }));
    Cookies.set("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    await syncUserData();
  };

  // cart item quanity change for both registered and unregistered
  const handleQuantityChange = async (itemId: number, quantity: number) => {
    const cartCookies = JSON.parse(Cookies.get("cart") || "[]");

    const updatedCart = cartCookies.map((shoe: Shoe) =>
      shoe.id === itemId ? { ...shoe, quantity } : shoe
    );
    setUser((prev) => ({ ...prev, cart: updatedCart }));
    Cookies.set("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    await syncUserData();
  };

  /*
  Favorite action methods
  */
  // add favorite
  const handleAddFavorites = async (favoriteItem: Shoe) => {
    const favoritesFromCookies = JSON.parse(Cookies.get("favorites") || "[]");

    // Avoid duplicates
    const isAlreadyFavorited = favoritesFromCookies.some(
      (shoe: Shoe) => shoe.id === favoriteItem.id
    );

    const updatedFavorites = isAlreadyFavorited
      ? favoritesFromCookies
      : [...favoritesFromCookies, { ...favoriteItem }];

    setUser((prev) => ({ ...prev, favorites: updatedFavorites }));
    Cookies.set("favorites", JSON.stringify(updatedFavorites));

    await syncUserData();
  };

  // remove favorite
  const handleRemoveFavorites = async (itemId: number) => {
    const favoritesCookies = JSON.parse(Cookies.get("favorites") || "[]");

    const updatedFavorites = favoritesCookies.filter(
      (shoe: Shoe) => shoe.id !== itemId
    );

    setUser((prev) => ({ ...prev, favorites: updatedFavorites }));
    Cookies.set("favorites", JSON.stringify(updatedFavorites));

    await syncUserData();
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
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

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstance.delete("/auth/delete-user/", {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      if (response.status === 200) {
        Cookies.remove("favorites");
        Cookies.remove("cart");
        window.location.reload();
        alert(response.data.message);
      }
    } catch (err: any) {
      alert(err.response.data.error);
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
        syncUserData,
        handleAddFavorites,
        handleRemoveFavorites,
        handleAddToCart,
        handleQuantityChange,
        handleRemoveFromCart,
        handleLogout,
        handleDeleteAccount,
      }}
    >
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};
