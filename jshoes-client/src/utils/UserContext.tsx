import { createContext } from "react";

export interface User {
  isLoggedIn: boolean;
  username: string;
  userid: number;
  favorites: any[];
  cart: any[];
}

export interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogout: () => void;
  syncUserData: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);
