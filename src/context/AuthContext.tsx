

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { FlashMessage } from '@components';
import { FlashMessageType, UIStrings, APIStrings, FlashMessageTypes, StorageKeys } from '@constant';

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
      const response = await fetch(APIStrings.LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': APIStrings.CONTENT_TYPE,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        // Save token
        await AsyncStorage.setItem(StorageKeys.USER_TOKEN, data.accessToken);
        setUserToken(data.accessToken);

        // Fetch user profile using the token
        const userRes = await fetch(APIStrings.USER_PROFILE_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `${APIStrings.BEARER_PREFIX}${data.accessToken}`,
          },
        });

        const userData: User = await userRes.json();

        if (userRes.ok) {
          await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(userData));
          setUser(userData);
          FlashMessage(UIStrings.LOGIN_SUCCESS, FlashMessageTypes.SUCCESS);
        }

        return true;
      } else {
        FlashMessage(data.message || data.error || UIStrings.LOGIN_FAILED, FlashMessageTypes.ERROR);
        return false;
      }
    } catch (error) {
      FlashMessage(UIStrings.NETWORK_ERROR, FlashMessageTypes.ERROR);
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([StorageKeys.USER_TOKEN, StorageKeys.USER_DATA]);
      setUserToken(null);
      setUser(null);
      FlashMessage(UIStrings.LOGOUT_SUCCESS, FlashMessageTypes.SUCCESS);
    } catch (error) {
      FlashMessage(UIStrings.LOGOUT_ERROR, FlashMessageTypes.ERROR);
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
