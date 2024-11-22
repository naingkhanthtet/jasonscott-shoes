import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../interceptors/axiosInstance";
import useCsrfToken from "./useCsrfToken";

interface User {
  isLoggedIn: boolean;
  username: string;
  userid: number;
  favorites: any[];
  cart: any[];
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogout: () => void;
  syncUserData: () => void;
}

const defaultUser = {
  isLoggedIn: false,
  username: "",
  userid: 0,
  favorites: [JSON.parse(Cookies.get("favorites") || "[]")],
  cart: [JSON.parse(Cookies.get("cart") || "[]")],
};

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isInitialized, setIsInitialized] = useState(false);
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

  const syncUserData = async () => {
    const sanitizedFavorites = user.favorites.flat();
    const sanitizedCart = user.cart.flat();

    if (user.isLoggedIn) {
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
        Cookies.set("favorites", JSON.stringify(response.data.favorites));
        Cookies.set("cart", JSON.stringify(response.data.cart));
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
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (user.isLoggedIn) syncUserData();
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout, syncUserData }}>
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
