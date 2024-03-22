import { h, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

import { LocalStorageItem } from "../types";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setToken(token: string): void;
  clearToken(): void;
}>({
  isAuthenticated: false,
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
    setToken,
    clearToken: () => setToken(""),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
