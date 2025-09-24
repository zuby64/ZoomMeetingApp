import { useState, useCallback } from 'react';
import { zoomService } from './zoom.methods';
import { ZoomMeetingConfig, ZoomMeetingResult, ZoomMeetingStatus } from './zoom.interface';

export const useZoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState<ZoomMeetingStatus>(
    zoomService.getMeetingStatus()
  );
  const [error, setError] = useState<string | null>(null);

  const joinMeeting = useCallback(async (config: ZoomMeetingConfig): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await zoomService.joinMeeting(config);
      if (result.success) {
        setMeetingStatus(zoomService.getMeetingStatus());
      } else {
        setError(result.error || 'Failed to join meeting');
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const leaveMeeting = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await zoomService.leaveMeeting();
      if (result.success) {
        setMeetingStatus(zoomService.getMeetingStatus());
      } else {
        setError(result.error || 'Failed to leave meeting');
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleMute = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await zoomService.toggleMute();
      if (result.success) {
        setMeetingStatus(zoomService.getMeetingStatus());
      } else {
        setError(result.error || 'Failed to toggle mute');
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleVideo = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await zoomService.toggleVideo();
      if (result.success) {
        setMeetingStatus(zoomService.getMeetingStatus());
      } else {
        setError(result.error || 'Failed to toggle video');
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    meetingStatus,
    error,
    joinMeeting,
    leaveMeeting,
    toggleMute,
    toggleVideo,
    clearError,
  };
};
