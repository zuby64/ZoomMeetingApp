// Re-export all services and hooks for cleaner imports

// Auth Service
export * as AuthService from './auth/auth.methods';
export * as AuthHooks from './auth/useAuth';

// Meeting Service
export * as MeetingService from './meeting/meeting.methods';
export * as MeetingHooks from './meeting/useMeeting';

// Axios Client
export { default as axiosClient } from './axiosClient';

// Type exports for convenience
export type { 
  LoginRequest, 
  LoginResponse, 
  UserProfile, 
  AuthState 
} from './auth/auth.interface';

export type { 
  JoinMeetingRequest, 
  JoinMeetingResponse, 
  CreateMeetingRequest, 
  CreateMeetingResponse,
  MeetingDetails,
  MeetingParticipant 
} from './meeting/meeting.interface';
