import { useState, useCallback, useEffect } from 'react';
import { zoomService } from './zoom.methods';
import { ZoomMeetingConfig, ZoomMeetingResult, ZoomMeetingStatus } from './zoom.interface';
import { useZoom as useZoomSDK } from '@zoom/meetingsdk-react-native';
import { showMessage } from 'react-native-flash-message';

// Helper function to safely access SDK services - only call methods that exist
const getSDKServices = (zoomSDK: any) => {
  if (!zoomSDK || typeof zoomSDK !== 'object') {
    return {
      meetingService: null,
      audioService: null,
      videoService: null,
      addListener: null,
      removeListener: null,
    };
  }

  const sdkWithServices = zoomSDK as any;
  
  // Only call methods that we can verify exist
  const availableMethods = Object.keys(sdkWithServices);
  console.log('🔍 Available SDK methods:', availableMethods);
  
  return {
    meetingService: availableMethods.includes('getMeetingService') && typeof sdkWithServices.getMeetingService === 'function' 
      ? sdkWithServices.getMeetingService() 
      : null,
    audioService: availableMethods.includes('getAudioService') && typeof sdkWithServices.getAudioService === 'function' 
      ? sdkWithServices.getAudioService() 
      : null,
    videoService: availableMethods.includes('getVideoService') && typeof sdkWithServices.getVideoService === 'function' 
      ? sdkWithServices.getVideoService() 
      : null,
    addListener: availableMethods.includes('addListener') && typeof sdkWithServices.addListener === 'function' 
      ? sdkWithServices.addListener 
      : null,
    removeListener: availableMethods.includes('removeListener') && typeof sdkWithServices.removeListener === 'function' 
      ? sdkWithServices.removeListener 
      : null,
  };
};

// Helper function to safely call methods on services
const safeCallServiceMethod = async (service: any, methodName: string, ...args: any[]) => {
  if (!service || typeof service !== 'object') {
    console.log(`⚠️ Service not available for ${methodName}`);
    return null;
  }

  const availableMethods = Object.keys(service);
  console.log(`🔍 Available methods on service:`, availableMethods);

  if (!availableMethods.includes(methodName) || typeof service[methodName] !== 'function') {
    console.log(`⚠️ Method ${methodName} not available on service`);
    return null;
  }

  try {
    console.log(`📞 Calling ${methodName} with args:`, args);
    const result = await service[methodName](...args);
    console.log(`✅ ${methodName} result:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Error calling ${methodName}:`, error);
    return null;
  }
};

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
    
    // Get SDK services safely
    const services = getSDKServices(zoomSDK);
    console.log('Meeting Service available:', !!services.meetingService);
    console.log('Audio Service available:', !!services.audioService);
    console.log('Video Service available:', !!services.videoService);
    console.log('Event Listeners available:', !!services.addListener);
    
    if (services.meetingService) {
      console.log('Meeting Service methods:', Object.keys(services.meetingService));
    }
    if (services.audioService) {
      console.log('Audio Service methods:', Object.keys(services.audioService));
    }
    if (services.videoService) {
      console.log('Video Service methods:', Object.keys(services.videoService));
    }
    
    console.log('✅ SDK is available and ready for use');
  }

  // Subscribe to Zoom SDK events for real-time status updates
  useEffect(() => {
    if (!zoomSDK) return;

    console.log('🎧 Setting up Zoom SDK event listeners...');

    // Listen for meeting status changes
    const handleMeetingStatusChanged = (status: any) => {
      console.log('📡 Meeting status changed:', status);
      
      // Update local state based on Zoom SDK events
      if (status && typeof status === 'object') {
        setMeetingStatus(prev => ({
          ...prev,
          isInMeeting: status.isInMeeting || prev.isInMeeting,
          isMuted: status.isMuted !== undefined ? status.isMuted : prev.isMuted,
          isVideoOn: status.isVideoOn !== undefined ? status.isVideoOn : prev.isVideoOn,
        }));
      }
    };

    // Listen for audio status changes
    const handleAudioStatusChanged = (status: any) => {
      console.log('🔊 Audio status changed:', status);
      if (status && typeof status === 'object' && status.isMuted !== undefined) {
        setMeetingStatus(prev => ({ ...prev, isMuted: status.isMuted }));
      }
    };

    // Listen for video status changes
    const handleVideoStatusChanged = (status: any) => {
      console.log('📹 Video status changed:', status);
      if (status && typeof status === 'object' && status.isVideoOn !== undefined) {
        setMeetingStatus(prev => ({ ...prev, isVideoOn: status.isVideoOn }));
      }
    };

    // Subscribe to events if methods exist
    const services = getSDKServices(zoomSDK);
    if (services.addListener) {
      console.log('📡 Adding Zoom SDK event listeners...');
      
      // Add event listeners
      services.addListener('onMeetingStatusChanged', handleMeetingStatusChanged);
      services.addListener('onAudioStatusChanged', handleAudioStatusChanged);
      services.addListener('onVideoStatusChanged', handleVideoStatusChanged);
      
      console.log('✅ Event listeners added successfully');
    } else {
      console.log('⚠️ zoomSDK.addListener not available, skipping event subscription');
    }

    // Cleanup function
    return () => {
      if (services.removeListener) {
        console.log('🧹 Removing Zoom SDK event listeners...');
        services.removeListener('onMeetingStatusChanged', handleMeetingStatusChanged);
        services.removeListener('onAudioStatusChanged', handleAudioStatusChanged);
        services.removeListener('onVideoStatusChanged', handleVideoStatusChanged);
        console.log('✅ Event listeners removed');
      }
    };
  }, [zoomSDK]);


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
      const availableMethods = Object.keys(zoomSDK);
      console.log('🔍 Available SDK methods for joinMeeting check:', availableMethods);
      
      if (!availableMethods.includes('joinMeeting') || typeof zoomSDK.joinMeeting !== 'function') {
        const errorMessage = 'Zoom SDK joinMeeting method is not available. This usually means you are testing in Expo Go, which is not supported. Please use: expo prebuild && expo run:ios';
        console.error('❌ joinMeeting method not available:', errorMessage);
        console.error('Available methods:', availableMethods);
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

      // Use the provided meeting JWT token (generated in MeetingScreen)
      const meetingJWT = config.zoomAccessToken;
      console.log('Using provided meeting JWT:', meetingJWT ? meetingJWT.substring(0, 50) + '...' : 'No JWT provided');

      if (!meetingJWT) {
        const errorMessage = 'Meeting JWT token is required to join a meeting. Please generate a meeting token first.';
        console.error('❌ No meeting JWT provided:', errorMessage);
        setError(errorMessage);
        showMessage({
          message: 'Authentication Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }

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

      let result;
      try {
        console.log('📞 Calling zoomSDK.joinMeeting...');
        result = await zoomSDK.joinMeeting(joinParams);
        console.log('Join meeting result:', result);
        console.log('Result type:', typeof result);
        console.log('Result is undefined:', result === undefined);
        console.log('Result is null:', result === null);
      } catch (error) {
        console.error('❌ Error calling joinMeeting:', error);
        const errorMessage = `Failed to join meeting: ${error instanceof Error ? error.message : 'Unknown error'}`;
        setError(errorMessage);
        showMessage({
          message: 'Join Meeting Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }
      
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
      console.log('🚪 Leaving meeting...');
      
      // Check if Zoom SDK is available
      if (!zoomSDK) {
        const errorMessage = 'Zoom SDK is not available for leaving meeting.';
        console.error('❌ SDK not available for leave:', errorMessage);
        setError(errorMessage);
        showMessage({
          message: 'SDK Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }

      // Call the actual Zoom SDK leaveMeeting method via meeting service
      const services = getSDKServices(zoomSDK);
      if (services.meetingService) {
        await safeCallServiceMethod(services.meetingService, 'leaveMeeting', 0); // 0 = leave meeting, 1 = end for all
      } else {
        console.log('⚠️ meetingService not available, using fallback');
      }

      // Update local state
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
      console.error('❌ Leave meeting error:', err);
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
  }, [zoomSDK]);

  const toggleMute = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔇 Toggling mute...');
      
      // Check if Zoom SDK is available
      if (!zoomSDK) {
        const errorMessage = 'Zoom SDK is not available for mute toggle.';
        console.error('❌ SDK not available for mute:', errorMessage);
        setError(errorMessage);
        showMessage({
          message: 'SDK Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }

      const newMuteState = !meetingStatus.isMuted;
      
      // Call the actual Zoom SDK muteMyAudio method via audio service
      const services = getSDKServices(zoomSDK);
      if (services.audioService) {
        await safeCallServiceMethod(services.audioService, 'muteMyAudio', newMuteState);
      } else {
        console.log('⚠️ audioService not available, using fallback');
      }

      // Update local state
      setMeetingStatus(prev => ({ ...prev, isMuted: newMuteState }));
      
      showMessage({
        message: 'Mute Toggled',
        description: `Audio ${newMuteState ? 'muted' : 'unmuted'}`,
        type: 'info',
        duration: 2000,
      });
      
      return { success: true };
    } catch (err) {
      console.error('❌ Toggle mute error:', err);
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
  }, [meetingStatus.isMuted, zoomSDK]);

  const toggleVideo = useCallback(async (): Promise<ZoomMeetingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📹 Toggling video...');
      
      // Check if Zoom SDK is available
      if (!zoomSDK) {
        const errorMessage = 'Zoom SDK is not available for video toggle.';
        console.error('❌ SDK not available for video:', errorMessage);
        setError(errorMessage);
        showMessage({
          message: 'SDK Error',
          description: errorMessage,
          type: 'danger',
          duration: 5000,
        });
        return { success: false, error: errorMessage };
      }

      const newVideoState = !meetingStatus.isVideoOn;
      
      // Call the actual Zoom SDK video methods via video service
      const services = getSDKServices(zoomSDK);
      if (services.videoService) {
        if (newVideoState) {
          // Turn video off
          await safeCallServiceMethod(services.videoService, 'stopVideo');
        } else {
          // Turn video on
          await safeCallServiceMethod(services.videoService, 'startVideo');
        }
      } else {
        console.log('⚠️ videoService not available, using fallback');
      }

      // Update local state
      setMeetingStatus(prev => ({ ...prev, isVideoOn: newVideoState }));
      
      showMessage({
        message: 'Video Toggled',
        description: `Video ${newVideoState ? 'turned off' : 'turned on'}`,
        type: 'info',
        duration: 2000,
      });
      
      return { success: true };
    } catch (err) {
      console.error('❌ Toggle video error:', err);
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
  }, [meetingStatus.isVideoOn, zoomSDK]);

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