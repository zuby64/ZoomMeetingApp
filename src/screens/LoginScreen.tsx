
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { Button, Text, TextInput } from '../components';
import { FlashMessage } from '../components';
import {UIStrings, FlashMessageTypes } from '../constant';

const LoginScreen = () => {
  const [username, setUsername] = useState('emilys'); // ✅ default test user
  const [password, setPassword] = useState('emilyspass');   // ✅ default test password
  const { login, isLoading } = useAuth();
  const { theme } = useAppTheme();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      FlashMessage(UIStrings.ENTER_USERNAME_PASSWORD, FlashMessageTypes.WARNING);
      return;
    }

    await login(username.trim(), password);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: theme.colors.text,
    },
    inputContainer: {
      marginBottom: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      marginTop: 10,
    },
    disabledButton: {
      backgroundColor: theme.colors.disabled,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    loadingContainer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text.H1 style={styles.title}>{UIStrings.LOGIN}</Text.H1>

      <TextInput
        containerStyle={styles.inputContainer}
        placeholder={UIStrings.USERNAME}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />

      <TextInput
        containerStyle={styles.inputContainer}
        placeholder={UIStrings.PASSWORD}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />

      <Button
        buttonText={isLoading ? UIStrings.LOGGING_IN : UIStrings.LOGIN}
        onPress={handleLogin}
        disabled={isLoading}
        buttonStyle={[styles.button, isLoading && styles.disabledButton]}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text.H4 style={styles.loadingText}>{UIStrings.LOGGING_IN}</Text.H4>
          </View>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
