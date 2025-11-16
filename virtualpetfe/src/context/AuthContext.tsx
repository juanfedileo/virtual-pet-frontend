import { createContext, useState, useContext, type ReactNode } from 'react';

// tipos
interface User {
  username: string;
  role: 'cliente' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, role: 'cliente' | 'admin') => void; // !!!!!!SIMULADO POR AHORA!!!!!!!
  logout: () => void;
}

// contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// (Provider)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // por ahora simulamos login, dsps se llamara a ala api de django
  const login = (username: string, role: 'cliente' | 'admin') => {
    const fakeUser = { username, role };
    setUser(fakeUser);
    // aca dsps guardariamos el token (ej. en localStorage)
  };

  const logout = () => {
    setUser(null);
    // borraria el token
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook personalizado
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};