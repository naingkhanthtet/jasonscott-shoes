import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../interceptors/axiosInstance";

interface User {
  isLoggedIn: boolean;
  username: string;
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
  favorites: [JSON.parse(Cookies.get("favorites") || "[]")],
  cart: [JSON.parse(Cookies.get("cart") || "[]")],
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  const syncUserData = async () => {
    if (user.isLoggedIn) {
      try {
        const response = await axiosInstance.post("auth/sync", {
          favorites: user.favorites,
          cart: user.cart,
        });
        console.log("Sync successful:", response.data);
      } catch (err) {
        console.error("Sync failed", err);
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
    if (user.isLoggedIn) syncUserData();
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout, syncUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
