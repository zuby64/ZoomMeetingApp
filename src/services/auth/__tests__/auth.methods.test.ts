import { AuthService } from '../auth.methods';
import axiosClient from '../../axiosClient';

// Mock axiosClient
jest.mock('../../axiosClient');
const mockedAxiosClient = axiosClient as jest.Mocked<typeof axiosClient>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return user data and token on successful login', async () => {
      // Arrange
      const mockLoginResponse = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'male',
        image: 'https://example.com/image.jpg',
        token: 'mock-token-123',
      };

      mockedAxiosClient.post.mockResolvedValueOnce({
        data: mockLoginResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const loginRequest = {
        username: 'testuser',
        password: 'password123',
      };

      // Act
      const result = await AuthService.login(loginRequest);

      // Assert
      expect(mockedAxiosClient.post).toHaveBeenCalledWith('/auth/login', loginRequest);
      expect(result).toEqual(mockLoginResponse);
    });

    it('should throw error on failed login', async () => {
      // Arrange
      const mockError = {
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      };

      mockedAxiosClient.post.mockRejectedValueOnce(mockError);

      const loginRequest = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      // Act & Assert
      await expect(AuthService.login(loginRequest)).rejects.toThrow('Invalid credentials');
      expect(mockedAxiosClient.post).toHaveBeenCalledWith('/auth/login', loginRequest);
    });

    it('should throw generic error message when no specific error message', async () => {
      // Arrange
      mockedAxiosClient.post.mockRejectedValueOnce(new Error('Network error'));

      const loginRequest = {
        username: 'testuser',
        password: 'password123',
      };

      // Act & Assert
      await expect(AuthService.login(loginRequest)).rejects.toThrow('Login failed');
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile data', async () => {
      // Arrange
      const mockUserProfile = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'male',
        image: 'https://example.com/image.jpg',
      };

      mockedAxiosClient.get.mockResolvedValueOnce({
        data: mockUserProfile,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      // Act
      const result = await AuthService.getUserProfile();

      // Assert
      expect(mockedAxiosClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUserProfile);
    });

    it('should throw error on failed profile fetch', async () => {
      // Arrange
      const mockError = {
        response: {
          data: {
            message: 'Unauthorized',
          },
        },
      };

      mockedAxiosClient.get.mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(AuthService.getUserProfile()).rejects.toThrow('Unauthorized');
    });
  });

  describe('logout', () => {
    it('should return success message', async () => {
      // Act
      const result = await AuthService.logout();

      // Assert
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('validateToken', () => {
    it('should return true for valid token', async () => {
      // Arrange
      mockedAxiosClient.get.mockResolvedValueOnce({
        data: { id: 1, username: 'testuser' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      // Act
      const result = await AuthService.validateToken();

      // Assert
      expect(result).toBe(true);
      expect(mockedAxiosClient.get).toHaveBeenCalledWith('/auth/me');
    });

    it('should return false for invalid token', async () => {
      // Arrange
      mockedAxiosClient.get.mockRejectedValueOnce(new Error('Unauthorized'));

      // Act
      const result = await AuthService.validateToken();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('refreshToken', () => {
    it('should throw error as refresh is not supported', async () => {
      // Act & Assert
      await expect(AuthService.refreshToken()).rejects.toThrow('Token refresh failed');
    });
  });
});
