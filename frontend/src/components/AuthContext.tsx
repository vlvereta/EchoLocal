import { h, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

import { LocalStorageItem } from "../types/entities";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  token: string;
  setToken(token: string): void;
  clearToken(): void;
}>({
  isAuthenticated: false,
  token: "",
  setToken: (token) => console.log(token),
  clearToken: () => console.log(""),
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem(LocalStorageItem.Token)
  );

  useEffect(() => {
    localStorage.setItem(LocalStorageItem.Token, token);
  }, [token]);

  const value = {
    isAuthenticated: !!token,
    token,
    setToken,
    clearToken: () => setToken(""),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
