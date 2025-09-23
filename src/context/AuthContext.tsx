import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashMessage } from '@components';
import { UIStrings, FlashMessageTypes, StorageKeys } from '@constant';
import { AuthHooks } from '../services';

interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  userToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use React Query hooks
  const { mutateAsync: loginMutation, isPending: isLoggingIn } = AuthHooks.useLogin();
  const { mutateAsync: logoutMutation, isPending: isLoggingOut } = AuthHooks.useLogout();
  const { data: storedUser } = AuthHooks.useStoredUser();

  // Update local state when stored user changes
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
      // Get token from storage
      AsyncStorage.getItem(StorageKeys.USER_TOKEN).then(token => {
        setUserToken(token);
      });
    } else {
      setUser(null);
      setUserToken(null);
    }
  }, [storedUser]);

  // Update loading state
  useEffect(() => {
    setIsLoading(isLoggingIn || isLoggingOut);
  }, [isLoggingIn, isLoggingOut]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await loginMutation({ username, password });
      
      // Update local state
      setUser(response);
      setUserToken(response.token);
      
      FlashMessage(UIStrings.LOGIN_SUCCESS, FlashMessageTypes.SUCCESS);
      return true;
    } catch (error: any) {
      FlashMessage(error.message || UIStrings.LOGIN_FAILED, FlashMessageTypes.ERROR);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation();
      
      // Update local state
      setUser(null);
      setUserToken(null);
      
      FlashMessage(UIStrings.LOGOUT_SUCCESS, FlashMessageTypes.SUCCESS);
    } catch (error: any) {
      FlashMessage(error.message || UIStrings.LOGOUT_ERROR, FlashMessageTypes.ERROR);
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