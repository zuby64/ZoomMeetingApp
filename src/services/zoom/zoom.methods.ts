import { ZoomMeetingStatus } from './zoom.interface';

// Real Zoom Service - Only for joining meetings
class ZoomService {
  private meetingStatus: ZoomMeetingStatus = {
    isInMeeting: false,
    isMuted: false,
    isVideoOn: true,
  };

  getMeetingStatus(): ZoomMeetingStatus {
    return { ...this.meetingStatus };
  }

  updateMeetingStatus(status: Partial<ZoomMeetingStatus>): void {
    this.meetingStatus = { ...this.meetingStatus, ...status };
  }
}

export const zoomService = new ZoomService();