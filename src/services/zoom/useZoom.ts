import { useState, useCallback } from 'react';
import { zoomService } from './zoom.methods';
import { ZoomMeetingConfig, ZoomMeetingResult, ZoomMeetingStatus } from './zoom.interface';
import { useZoom as useZoomSDK } from '@zoom/meetingsdk-react-native';
import { generateMeetingJWT } from './jwtGenerator';
import { showMessage } from 'react-native-flash-message';

export const useZoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState<ZoomMeetingStatus>({
    isInMeeting: false,
    isMuted: false,
    isVideoOn: true,
  });
  const [error, setError] = useState<string | null>(null);
  
  // Get the real Zoom SDK instance
  const zoomSDK = useZoomSDK();
  
  // Debug: Log the SDK instance
  console.log('Zoom SDK instance:', zoomSDK);
  console.log('Zoom SDK type:', typeof zoomSDK);
  if (zoomSDK) {
    console.log('Zoom SDK methods:', Object.keys(zoomSDK));
    console.log('Zoom SDK joinMeeting type:', typeof zoomSDK.joinMeeting);
    console.log('✅ SDK is available and ready for use');
  }


  const joinMeeting = useCallback(async (config: ZoomMeetingConfig): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🚀 Starting meeting join process...');
      console.log('⚠️  IMPORTANT: Make sure you are NOT testing in Expo Go!');
      console.log('⚠️  You must use: expo prebuild && expo run:ios (or expo run:android)');
      
      // Check if Zoom SDK is available
      if (!zoomSDK) {
        const errorMessage = 'Zoom SDK is not available. Please wait for SDK initialization.';
        console.error('❌ SDK not available:', errorMessage);
        setError(errorMessage);
        showMessage({
          message: 'SDK Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }

      // Check if joinMeeting method exists
      if (typeof zoomSDK.joinMeeting !== 'function') {
        const errorMessage = 'Zoom SDK joinMeeting method is not available. This usually means you are testing in Expo Go, which is not supported. Please use: expo prebuild && expo run:ios';
        console.error('❌ joinMeeting method not available:', errorMessage);
        setError(errorMessage);
        showMessage({
          message: 'SDK Error',
          description: errorMessage,
          type: 'danger',
          duration: 8000,
        });
        return { success: false, error: errorMessage };
      }


      console.log('Attempting to join meeting with config:', {
        userName: config.userName,
        meetingNumber: config.meetingId,
        hasPassword: !!config.meetingPassword,
      });

      // Generate JWT token for this specific meeting
      const meetingJWT = generateMeetingJWT(config.meetingId, 0); // 0 = attendee role
      console.log('Generated meeting JWT:', meetingJWT.substring(0, 50) + '...');

      // Join parameters following the correct Zoom Meeting SDK pattern
      const joinParams = {
        meetingNumber: config.meetingId,
        userName: config.userName,
        zoomAccessToken: meetingJWT, // Meeting-specific JWT token
        password: config.meetingPassword || '', // Optional password
      };
      
      console.log('Join parameters:', joinParams);
      
      // Call joinMeeting exactly like the official example
      console.log('Joining meeting with params:', joinParams);
      
      const result = await zoomSDK.joinMeeting(joinParams);
      console.log('Join meeting result:', result);
      console.log('Result type:', typeof result);
      console.log('Result is undefined:', result === undefined);
      console.log('Result is null:', result === null);
      
      // Handle different result types
      if (result === 0 || result === true || result === 'success') { // Success cases
        console.log('✅ Successfully joined meeting!');
        setMeetingStatus(prev => ({ ...prev, isInMeeting: true }));
        showMessage({
          message: 'Success',
          description: 'Successfully joined the meeting!',
          type: 'success',
          duration: 3000,
        });
        return { success: true };
      } else if (result === undefined || result === null) {
        const errorMessage = 'Zoom SDK returned undefined result. This may indicate an SDK initialization issue or invalid meeting credentials.';
        setError(errorMessage);
        showMessage({
          message: 'SDK Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      } else if (typeof result === 'number' && result !== 0) {
        // Handle numeric error codes
        const errorMessage = `Failed to join meeting with error code: ${result}`;
        setError(errorMessage);
        showMessage({
          message: 'Join Meeting Failed',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      } else {
        const errorMessage = `Failed to join meeting (result: ${result}, type: ${typeof result})`;
        setError(errorMessage);
        showMessage({
          message: 'Join Meeting Failed',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error('Join meeting error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to join meeting';
      setError(errorMessage);
      showMessage({
        message: 'Join Meeting Error',
        description: errorMessage,
        type: 'danger',
        duration: 5000,
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [zoomSDK]);

  const leaveMeeting = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Update local state - Zoom SDK handles the actual leaving
      setMeetingStatus(prev => ({ 
        ...prev, 
        isInMeeting: false,
        isMuted: false,
        isVideoOn: true 
      }));
      
      showMessage({
        message: 'Left Meeting',
        description: 'You have left the meeting',
        type: 'info',
        duration: 3000,
      });
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to leave meeting';
      setError(errorMessage);
      showMessage({
        message: 'Leave Meeting Error',
        description: errorMessage,
        type: 'danger',
        duration: 5000,
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleMute = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Toggle mute state - the actual mute/unmute is handled by Zoom SDK UI
      setMeetingStatus(prev => ({ ...prev, isMuted: !prev.isMuted }));
      
      showMessage({
        message: 'Mute Toggled',
        description: `Audio ${meetingStatus.isMuted ? 'unmuted' : 'muted'}`,
        type: 'info',
        duration: 2000,
      });
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle mute';
      setError(errorMessage);
      showMessage({
        message: 'Toggle Mute Error',
        description: errorMessage,
        type: 'danger',
        duration: 5000,
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [meetingStatus.isMuted]);

  const toggleVideo = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Toggle video state - the actual video on/off is handled by Zoom SDK UI
      setMeetingStatus(prev => ({ ...prev, isVideoOn: !prev.isVideoOn }));
      
      showMessage({
        message: 'Video Toggled',
        description: `Video ${meetingStatus.isVideoOn ? 'turned off' : 'turned on'}`,
        type: 'info',
        duration: 2000,
      });
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle video';
      setError(errorMessage);
      showMessage({
        message: 'Toggle Video Error',
        description: errorMessage,
        type: 'danger',
        duration: 5000,
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [meetingStatus.isVideoOn]);

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