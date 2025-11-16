import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { getAccessToken, clearTokens, getUsername } from '../services/authService';

// tipos
interface User {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
}

// contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// (Provider)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // On mount, check if user is already authenticated
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
    }
    const sessionRole = sessionStorage.getItem('session_role');
    if (sessionRole) setRole(sessionRole);
  }, []);

  // Try to hydrate user from stored auth object
  useEffect(() => {
    const storedUsername = getUsername();
    if (storedUsername) {
      setUser({ username: storedUsername, email: '', role: (sessionStorage.getItem('session_role') || '') });
    }
  }, []);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRole(null);
    clearTokens();
    sessionStorage.removeItem('session_role');
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, accessToken, setUser, setAccessToken, role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};