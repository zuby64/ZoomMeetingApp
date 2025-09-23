import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constant';

// Base URL configuration - can be moved to env variables later
const BASE_URL = 'https://dummyjson.com';

// Create axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to get token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Clear stored token and user data
        await AsyncStorage.multiRemove([StorageKeys.USER_TOKEN, StorageKeys.USER_DATA]);
        
        // You can dispatch a logout action here if using Redux/Context
        // or navigate to login screen
        console.log('Session expired. Please login again.');
      } catch (storageError) {
        console.warn('Failed to clear storage:', storageError);
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }

    // Handle specific error status codes
    switch (error.response?.status) {
      case 400:
        console.error('Bad Request:', error.response.data);
        break;
      case 401:
        console.error('Unauthorized:', error.response.data);
        break;
      case 403:
        console.error('Forbidden:', error.response.data);
        break;
      case 404:
        console.error('Not Found:', error.response.data);
        break;
      case 500:
        console.error('Internal Server Error:', error.response.data);
        break;
      default:
        console.error('API Error:', error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
