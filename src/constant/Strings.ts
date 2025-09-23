// Common UI Strings
export enum UIStrings {
  // Login Screen
  LOGIN = 'Login',
  USERNAME = 'Username',
  PASSWORD = 'Password',
  LOGGING_IN = 'Logging in...',
  
  // Home Screen
  WELCOME_MESSAGE = 'Welcome to the App!',
  LOGOUT = 'Logout',
  GO_TO_PROFILE = 'Go to Profile',
  GO_TO_TYPO_SCREEN = 'Go to Typo Screen',
  TOGGLE_THEME = 'Toggle Theme',
  
  // Validation Messages
  ENTER_USERNAME_PASSWORD = 'Please enter both username and password',
  
  // Success Messages
  LOGIN_SUCCESS = 'Login successful!',
  LOGOUT_SUCCESS = 'Logged out successfully!',
  
  // Error Messages
  LOGIN_FAILED = 'Login failed',
  NETWORK_ERROR = 'Network error. Please try again.',
  LOGOUT_ERROR = 'Logout error. Please try again.',
  
  // Loading Messages
  INITIALIZING = 'Initializing...',
  AUTHENTICATING = 'Authenticating...',
  
  // Placeholders
  ENTER_USERNAME = 'Enter username',
  ENTER_PASSWORD = 'Enter password',
}

// API Related Strings
export enum APIStrings {
  LOGIN_ENDPOINT = 'https://dummyjson.com/auth/login',
  USER_PROFILE_ENDPOINT = 'https://dummyjson.com/auth/me',
  CONTENT_TYPE = 'application/json',
  AUTHORIZATION_HEADER = 'Authorization',
  BEARER_PREFIX = 'Bearer ',
}

// Storage Keys are defined in StorageKey.ts

// Flash Message Types
export enum FlashMessageTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

// Screen Names
export enum ScreenNames {
  LOGIN = 'Login',
  HOME = 'Home',
  PROFILE = 'Profile',
  NOT_FOUND = 'NotFound',
}

// Button Types
export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  WARNING = 'warning',
}

// Input Types
export enum InputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMERIC = 'numeric',
}

// Theme Types
export enum ThemeTypes {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
