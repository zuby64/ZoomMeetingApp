import axiosClient from '../axiosClient';
import { LoginRequest, LoginResponse, UserProfile, LogoutResponse } from './auth.interface';

/**
 * Authentication API methods using axios
 */
export class AuthService {
  /**
   * Login user with username and password
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  /**
   * Get user profile using token
   */
  static async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await axiosClient.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  /**
   * Logout user (if API supports it)
   */
  static async logout(): Promise<LogoutResponse> {
    try {
      // Since dummyjson doesn't have a logout endpoint, we'll just return success
      // In a real app, you might call an API endpoint to invalidate the token
      return { message: 'Logged out successfully' };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }

  /**
   * Refresh token (if API supports it)
   */
  static async refreshToken(): Promise<{ token: string }> {
    try {
      // This would typically call a refresh token endpoint
      // For now, we'll throw an error as dummyjson doesn't support this
      throw new Error('Token refresh not supported');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  }

  /**
   * Validate current token
   */
  static async validateToken(): Promise<boolean> {
    try {
      await axiosClient.get('/auth/me');
      return true;
    } catch (error) {
      return false;
    }
  }
}
