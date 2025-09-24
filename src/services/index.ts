// Re-export all services and hooks for cleaner imports

// Auth Service
export * as AuthService from './auth/auth.methods';
export * as AuthHooks from './auth/useAuth';

// Meeting Service
export * as MeetingService from './meeting/meeting.methods';
export * as MeetingHooks from './meeting/useMeeting';

// Zoom Service
export * as ZoomService from './zoom/zoom.methods';
export * as ZoomHooks from './zoom/useZoom';

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

export type { 
  ZoomMeetingConfig, 
  ZoomMeetingResult, 
  ZoomMeetingStatus 
} from './zoom/zoom.interface';
