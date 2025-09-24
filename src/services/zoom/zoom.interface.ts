export interface ZoomMeetingConfig {
  meetingId: string;
  meetingPassword?: string;
  userName: string;
  userEmail?: string;
}

export interface ZoomMeetingResult {
  success: boolean;
  error?: string;
}

export interface ZoomMeetingStatus {
  isInMeeting: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}
