import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useZoom } from '../../services/zoom';
import { Button, Text, TextInput } from '../../components';
import { UIStrings } from '../../constant';

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

  const [meetingId, setMeetingId] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleJoinMeeting = async () => {
    if (!meetingId.trim()) {
      Alert.alert('Error', 'Please enter a meeting ID');
      return;
    }

    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    const result = await joinMeeting({
      meetingId: meetingId.trim(),
      meetingPassword: meetingPassword.trim() || undefined,
      userName: userName.trim(),
    });

    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to join meeting');
    }
  };

  const handleLeaveMeeting = async () => {
    const result = await leaveMeeting();
    if (result.success) {
      navigation.goBack();
    } else {
      Alert.alert('Error', result.error || 'Failed to leave meeting');
    }
  };

  const handleToggleMute = async () => {
    const result = await toggleMute();
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to toggle mute');
    }
  };

  const handleToggleVideo = async () => {
    const result = await toggleVideo();
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to toggle video');
    }
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
    formContainer: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    buttonContainer: {
      marginBottom: 20,
    },
    button: {
      marginVertical: 8,
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
    statusText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: theme.colors.text,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
    },
  });

  if (meetingStatus.isInMeeting) {
    return (
      <View style={styles.container}>
        <Text.H1 style={styles.title}>In Meeting</Text.H1>
        
        <View style={styles.meetingControls}>
          <Button
            buttonText={meetingStatus.isMuted ? 'Unmute' : 'Mute'}
            onPress={handleToggleMute}
            buttonStyle={[styles.controlButton, { 
              backgroundColor: meetingStatus.isMuted ? 'red' : 'green' 
            }]}
            disabled={isLoading}
          />
          
          <Button
            buttonText={meetingStatus.isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
            onPress={handleToggleVideo}
            buttonStyle={[styles.controlButton, { 
              backgroundColor: meetingStatus.isVideoOn ? 'blue' : 'gray' 
            }]}
            disabled={isLoading}
          />
        </View>

        <Button
          buttonText="Leave Meeting"
          onPress={handleLeaveMeeting}
          buttonStyle={[styles.button, { backgroundColor: 'red' }]}
          disabled={isLoading}
        />

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text.H1 style={styles.title}>Join Zoom Meeting</Text.H1>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Meeting ID *</Text>
          <TextInput
            value={meetingId}
            onChangeText={setMeetingId}
            placeholder="Enter meeting ID"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Meeting Password (Optional)</Text>
          <TextInput
            value={meetingPassword}
            onChangeText={setMeetingPassword}
            placeholder="Enter meeting password"
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name *</Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your name"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          buttonText="Join Meeting"
          onPress={handleJoinMeeting}
          buttonStyle={[styles.button, { backgroundColor: 'blue' }]}
          disabled={isLoading}
        />

        <Button
          buttonText="Back"
          onPress={() => navigation.goBack()}
          buttonStyle={[styles.button, { backgroundColor: 'gray' }]}
          disabled={isLoading}
        />
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

export default MeetingScreen;
