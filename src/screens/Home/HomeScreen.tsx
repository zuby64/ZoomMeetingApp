import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ScreenNames } from '@navigation/types';
import { useSafeNavigation } from '@hooks/useSafeNavigation'; // ✅ your new hook
import { useAppTheme } from '@hooks/useAppTheme';
import { useAuth } from '@context/AuthContext';

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
      <Text style={styles.welcomeText}>Welcome to the App!</Text>
      
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Logout"
            onPress={handleLogout}
            color="red"
          />
        </View>

        {/* ✅ Example of normal navigation */}
        <View style={styles.button}>
          <Button
            title="Go to Profile"
            onPress={() => safeNavigate(ScreenNames.Profile, { userId: '123' })}
          />
        </View>

        {/* ✅ Example of a typo / fallback test */}
        <View style={styles.button}>
          <Button
            title="Go to Typo Screen"
            onPress={() =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              safeNavigate('TypoScreenName' as any)
            }
          />
        </View>

        {/* ✅ Toggle Theme */}
        <View style={styles.button}>
          <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
