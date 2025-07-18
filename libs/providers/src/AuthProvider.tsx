import { User } from '@peerless/models';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('isAuthenticated') === 'true');

  const queryClient = useQueryClient(); // Initialize query client

  const handleLogin = useCallback(() => {
    setUser({ id: 1 });
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    // Clear all necessary local storage items
    delete localStorage['token'];
    delete localStorage['refreshToken'];
    delete localStorage['tokenValidTo'];
    delete localStorage['originatorEntity'];
    delete localStorage['isAuthenticated'];

    // Update state
    setUser(null);
    setIsAuthenticated(false);

    // Clear TanStack Query cache
    queryClient.clear();
    window.location.href = '/login';
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user, isAuthenticated, handleLogin, handleLogout }),
        [user, isAuthenticated, handleLogin, handleLogout]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
