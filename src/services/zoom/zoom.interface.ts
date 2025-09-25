export interface ZoomMeetingConfig {
  meetingId: string;
  meetingPassword?: string;
  userName: string;
  userEmail?: string;
}

export interface ZoomCreateMeetingConfig {
  topic: string;
  duration?: number; // in minutes
  password?: string;
  waitingRoom?: boolean;
  joinBeforeHost?: boolean;
  muteUponEntry?: boolean;
  videoOff?: boolean;
}

export interface ZoomMeetingResult {
  success: boolean;
  error?: string;
  meetingId?: string;
  meetingPassword?: string;
  joinUrl?: string;
}

export interface ZoomMeetingStatus {
  isInMeeting: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

