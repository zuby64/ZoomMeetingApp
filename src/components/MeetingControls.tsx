import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from './index';
import { useAppTheme } from '../hooks/useAppTheme';
import { ZoomMeetingStatus } from '../services/zoom/zoom.interface';
import { ZoomVideoView } from '@zoom/meetingsdk-react-native';

interface MeetingControlsProps {
  meetingStatus: ZoomMeetingStatus;
  onLeaveMeeting: () => void;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  isLoading: boolean;
  error?: string | null;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({
  meetingStatus,
  onLeaveMeeting,
  onToggleMute,
  onToggleVideo,
  isLoading,
  error,
}) => {
  const { theme } = useAppTheme();

  const handleToggleMute = () => {
    onToggleMute();
  };

  const handleToggleVideo = () => {
    onToggleVideo();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 30,
    },
    meetingControls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    controlButton: {
      flex: 1,
      marginHorizontal: 5,
    },
    button: {
      marginVertical: 8,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
    },
    controlsOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 20,
    },
    infoText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    subInfoText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.8,
    },
        sdkInfo: {
          color: 'white',
          fontSize: 12,
          textAlign: 'center',
          opacity: 0.6,
          marginTop: 5,
        },
        videoView: {
          flex: 1,
          backgroundColor: 'black',
        },
        buttonRow: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
          paddingHorizontal: 10,
        },
        controlButton: {
          flex: 1,
          marginHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 8,
        },
  });

  return (
    <View style={styles.container}>
      {/* Real Zoom Video View - This is the actual Zoom video interface */}
      <ZoomVideoView
        style={styles.videoView}
      />

      {/* Custom controls overlay */}
      <View style={styles.controlsOverlay}>
        <Text style={styles.infoText}>
          🎥 Real Zoom Meeting Active
        </Text>
        <Text style={styles.subInfoText}>
          Native Zoom interface with real video calling
        </Text>
        
        {/* Custom control buttons */}
        <View style={styles.buttonRow}>
          <Button
            buttonText={meetingStatus.isMuted ? "Unmute" : "Mute"}
            onPress={onToggleMute}
            buttonStyle={[styles.controlButton, { backgroundColor: meetingStatus.isMuted ? 'red' : 'green' }]}
            disabled={isLoading}
          />
          
          <Button
            buttonText={meetingStatus.isVideoOn ? "Stop Video" : "Start Video"}
            onPress={onToggleVideo}
            buttonStyle={[styles.controlButton, { backgroundColor: meetingStatus.isVideoOn ? 'red' : 'green' }]}
            disabled={isLoading}
          />
          
          <Button
            buttonText="Leave Meeting"
            onPress={onLeaveMeeting}
            buttonStyle={[styles.controlButton, { backgroundColor: 'red' }]}
            disabled={isLoading}
          />
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </View>
  );
};

export default MeetingControls;
