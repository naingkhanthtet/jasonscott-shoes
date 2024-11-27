import { createContext } from "react";
import Shoe from "../types/Shoe";
export interface User {
  isLoggedIn: boolean;
  username: string;
  userid: number;
  favorites: Shoe[];
  cart: Shoe[];
}

export interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogout: () => void;
  syncUserData: () => void;
  handleAddToCart: (cartItem: Shoe) => void;
  handleRemoveFromCart: (itemId: number) => void;
  handleAddFavorites: (favoriteItem: Shoe) => void;
  handleRemoveFavorites: (itemId: number) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);
