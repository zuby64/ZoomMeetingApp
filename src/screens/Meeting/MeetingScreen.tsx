import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useZoom } from '../../services/zoom';
import { generateMeetingJWT } from '../../services/zoom/jwtGenerator';
import { 
  Button, 
  Text, 
  MeetingJoinForm, 
  MeetingControls 
} from '../../components';

interface MeetingScreenProps {
  navigation: any;
}

const MeetingScreen: React.FC<MeetingScreenProps> = ({ navigation }) => {
  const { theme } = useAppTheme();
  const { 
    isLoading, 
    meetingStatus, 
    error, 
    joinMeeting, 
    leaveMeeting, 
    toggleMute, 
    toggleVideo, 
    clearError 
  } = useZoom();

  // Form state
  const [meetingId, setMeetingId] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoinMeeting = async () => {
    if (!meetingId.trim() || !userName.trim()) {
      return;
    }

    try {
      // Generate meeting JWT for this specific meeting
      console.log('🔑 Generating meeting JWT for meeting:', meetingId.trim());
      const meetingToken = generateMeetingJWT(meetingId.trim(), 0); // 0=attendee, 1=host
      console.log('✅ Meeting JWT generated:', meetingToken.substring(0, 50) + '...');

      const result = await joinMeeting({
        meetingId: meetingId.trim(),
        meetingPassword: meetingPassword.trim(),
        userName: userName.trim(),
        zoomAccessToken: meetingToken, // ✅ REQUIRED - Meeting-specific JWT
      });

      if (result.success) {
        // Meeting joined successfully - the UI will switch to MeetingControls
        console.log('✅ Successfully joined meeting');
      } else {
        console.error('❌ Failed to join meeting:', result.error);
      }
    } catch (error) {
      console.error('❌ Error generating meeting JWT:', error);
    }
  };

  const handleLeaveMeeting = async () => {
    const result = await leaveMeeting();
    if (result.success) {
      // Reset form
      setMeetingId('');
      setMeetingPassword('');
      setUserName('');
    }
  };

  const handleToggleMute = async () => {
    await toggleMute();
  };

  const handleToggleVideo = async () => {
    await toggleVideo();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginVertical: 20,
    },
    buttonContainer: {
      padding: 20,
    },
    button: {
      marginVertical: 8,
    },
    errorText: {
      color: theme.colors.error,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  // If in meeting, show meeting controls
  if (meetingStatus.isInMeeting) {
    return (
      <MeetingControls
        meetingStatus={meetingStatus}
        onLeaveMeeting={handleLeaveMeeting}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  // Show join meeting form
  return (
    <ScrollView style={styles.container}>
      <Text.H1 style={styles.title}>Join Zoom Meeting</Text.H1>
      
      <MeetingJoinForm
        meetingId={meetingId}
        setMeetingId={setMeetingId}
        meetingPassword={meetingPassword}
        setMeetingPassword={setMeetingPassword}
        userName={userName}
        setUserName={setUserName}
        onJoinMeeting={handleJoinMeeting}
        isLoading={isLoading}
      />

      <View style={styles.buttonContainer}>
        <Button
          buttonText="Back to Home"
          onPress={() => navigation.goBack()}
          buttonStyle={[styles.button, { backgroundColor: 'gray' }]}
          disabled={isLoading}
        />
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </ScrollView>
  );
};

export default MeetingScreen;