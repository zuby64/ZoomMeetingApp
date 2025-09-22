import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenNames } from '../../navigation/types';
import { useSafeNavigation } from '../../hooks/useSafeNavigation'; // ✅ your new hook
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext';
import { Button, Text } from '../../components';

const HomeScreen = () => {
  const { safeNavigate } = useSafeNavigation(); // ✅ use this instead of useTypedNavigation
  const { theme, toggleTheme } = useAppTheme();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 300,
    },
    button: {
      marginVertical: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text.H1 style={styles.welcomeText}>Welcome to the App!</Text.H1>
      
      <View style={styles.buttonContainer}>
        <Button
          buttonText="Logout"
          onPress={handleLogout}
          buttonStyle={[styles.button, { backgroundColor: 'red' }]}
        />

        {/* ✅ Example of normal navigation */}
        <Button
          buttonText="Go to Profile"
          onPress={() => safeNavigate(ScreenNames.Profile, { userId: '123' })}
          buttonStyle={styles.button}
        />

        {/* ✅ Example of a typo / fallback test */}
        <Button
          buttonText="Go to Typo Screen"
          onPress={() =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            safeNavigate('TypoScreenName' as any)
          }
          buttonStyle={styles.button}
        />

        {/* ✅ Toggle Theme */}
        <Button 
          buttonText="Toggle Theme" 
          onPress={toggleTheme}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
