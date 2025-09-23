// Meeting Request Interfaces
export interface JoinMeetingRequest {
  topic: string;
  username: string;
  password?: string;
  meetingId?: string;
}

export interface CreateMeetingRequest {
  topic: string;
  duration?: number;
  password?: string;
  settings?: {
    host_video?: boolean;
    participant_video?: boolean;
    join_before_host?: boolean;
    mute_upon_entry?: boolean;
  };
}

export interface LeaveMeetingRequest {
  meetingId: string;
  userId: string;
}

// Meeting Response Interfaces
export interface JoinMeetingResponse {
  sessionId: string;
  token: string;
  meetingId: string;
  participantId: string;
  joinUrl: string;
  meetingInfo: {
    topic: string;
    startTime: string;
    duration: number;
    host: string;
  };
}

export interface CreateMeetingResponse {
  meetingId: string;
  joinUrl: string;
  hostUrl: string;
  password: string;
  meetingInfo: {
    topic: string;
    startTime: string;
    duration: number;
  };
}

export interface MeetingParticipant {
  id: string;
  username: string;
  email: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  joinTime: string;
}

export interface MeetingDetails {
  id: string;
  topic: string;
  startTime: string;
  duration: number;
  status: 'scheduled' | 'live' | 'ended';
  host: {
    id: string;
    username: string;
    email: string;
  };
  participants: MeetingParticipant[];
  settings: {
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
  };
}

// Meeting Error Interface
export interface MeetingError {
  message: string;
  code: string;
  status?: number;
}

// Meeting State Interface
export interface MeetingState {
  currentMeeting: MeetingDetails | null;
  isInMeeting: boolean;
  isLoading: boolean;
  error: string | null;
}
