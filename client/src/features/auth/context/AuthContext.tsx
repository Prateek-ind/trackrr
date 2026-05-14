import { createContext, useState, type ReactNode } from "react";
import type { LoginAuthType, UserType } from "../types/auth.types";
import { loginUser, logoutUser } from "../api/auth";

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (data: LoginAuthType) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = async (data: LoginAuthType) => {
    const res = await loginUser(data);
    setUser(res.user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
