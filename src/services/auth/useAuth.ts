import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../constant';
import { AuthService } from './auth.methods';
import { LoginRequest, UserProfile } from './auth.interface';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await AuthService.login(credentials);
      
      // Store token and user data
      await AsyncStorage.setItem(StorageKeys.USER_TOKEN, response.token);
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(response));
      
      return response;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      
      // Set user data in cache
      queryClient.setQueryData(authKeys.user(), data);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await AuthService.logout();
      
      // Clear stored data
      await AsyncStorage.multiRemove([StorageKeys.USER_TOKEN, StorageKeys.USER_DATA]);
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
};

/**
 * Hook to get user profile
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => AuthService.getUserProfile(),
    enabled: false, // Only fetch when explicitly called
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to validate current token
 */
export const useValidateToken = () => {
  return useQuery({
    queryKey: [...authKeys.all, 'validate'],
    queryFn: () => AuthService.validateToken(),
    enabled: false, // Only fetch when explicitly called
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

/**
 * Hook to get stored user data
 */
export const useStoredUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async (): Promise<UserProfile | null> => {
      try {
        const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);
        return userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error('Failed to get stored user:', error);
        return null;
      }
    },
    staleTime: Infinity, // Never refetch automatically
  });
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { data: user } = useStoredUser();
  return !!user;
};
