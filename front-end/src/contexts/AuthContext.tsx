import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/api';
import { User, LoginRequest } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se há token salvo ao iniciar
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        // TODO: Validar token com backend ou decodificar
        // Por enquanto, assumir logado
        setUser({ id: 1, email: 'user@example.com' }); // Placeholder
      }
    };
    checkToken();
  }, []);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.login(data);
      await AsyncStorage.setItem('access_token', response.access_token);
      // Decodificar JWT para obter o ID do usuário
      const payload = JSON.parse(atob(response.access_token.split('.')[1]));
      setUser({
        id: parseInt(payload.sub),
        email: data.email,
        name: data.email.split('@')[0],
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.warn('Erro ao fazer logout no servidor:', error);
    }
    await AsyncStorage.removeItem('access_token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};