import { createContext, useEffect, useState, type ReactNode } from "react";
import type { LoginAuthType, UserType } from "../types/auth.types";
import { loginUser, logoutUser, restoreSession } from "../../../api/auth";

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (data: LoginAuthType) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await restoreSession();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
