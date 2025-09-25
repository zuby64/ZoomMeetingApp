import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput } from './index';
import { useAppTheme } from '../hooks/useAppTheme';
// Simple validation function
const validateMeetingJoin = (data: { meetingId: string; userName: string }) => {
  if (!data.meetingId || !data.meetingId.trim()) {
    return { isValid: false, error: 'Meeting ID is required' };
  }
  if (!data.userName || !data.userName.trim()) {
    return { isValid: false, error: 'User name is required' };
  }
  return { isValid: true };
};

interface MeetingJoinFormProps {
  meetingId: string;
  setMeetingId: (id: string) => void;
  meetingPassword: string;
  setMeetingPassword: (password: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  onJoinMeeting: () => void;
  isLoading: boolean;
}

const MeetingJoinForm: React.FC<MeetingJoinFormProps> = ({
  meetingId,
  setMeetingId,
  meetingPassword,
  setMeetingPassword,
  userName,
  setUserName,
  onJoinMeeting,
  isLoading,
}) => {
  const { theme } = useAppTheme();

  const handleJoinMeeting = () => {
    // Validate join meeting data
    const validation = validateMeetingJoin({ meetingId, userName });
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.error);
      return;
    }
    onJoinMeeting();
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
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
  });

  return (
    <View style={styles.container}>
      <Text.H3 style={styles.sectionTitle}>Join Existing Meeting</Text.H3>
      
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

      <View style={styles.buttonContainer}>
        <Button
          buttonText="Join Meeting"
          onPress={handleJoinMeeting}
          buttonStyle={[styles.button, { backgroundColor: 'blue' }]}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default MeetingJoinForm;
