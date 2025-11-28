import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_TOKEN_KEY = 'token';

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      setToken(JSON.stringify(token));
    } else {
      setToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const response = await AuthService.auth(email, password);
    if (response instanceof Error) {
      return response.message;
    }
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(response.token));
    setToken(response.token);
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setToken(undefined);
  }, [])

  const isAuthenticated = useMemo(() => !!token, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
