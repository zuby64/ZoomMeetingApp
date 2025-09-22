

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  // add other fields returned by dummyjson if needed
}

interface AuthContextType {
  user: User | null;
  userToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const storedUser = await AsyncStorage.getItem('user');

        if (token) {
          setUserToken(token);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

const login = async (username: string, password: string): Promise<boolean> => {
  try {
    setIsLoading(true);
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    console.log('Login response:', { status: response.status, data });

    if (response.ok && data.accessToken) {
      // Save token
      await AsyncStorage.setItem('userToken', data.accessToken);
      setUserToken(data.accessToken);

      // Fetch user profile using the token
      const userRes = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      const userData: User = await userRes.json();

      if (userRes.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }

      return true;
    } else {
      console.error('Login failed:', data.message || data.error);
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  } finally {
    setIsLoading(false);
  }
};


  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'user']);
      setUserToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    userToken,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
