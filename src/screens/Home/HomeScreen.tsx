import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenNames } from '../../navigation/types';
import { useSafeNavigation } from '../../hooks/useSafeNavigation';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAuth } from '../../context/AuthContext';
import { Button, Text } from '../../components';
import { UIStrings } from '../../constant';

const HomeScreen = () => {
  const { safeNavigate } = useSafeNavigation();
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
      <Text.H1 style={styles.welcomeText}>{UIStrings.WELCOME_MESSAGE}</Text.H1>
      
      <View style={styles.buttonContainer}>
        {/* Commented out example navigation and theme toggle buttons */}
        {/* <Button
          buttonText={UIStrings.GO_TO_PROFILE}
          onPress={() => safeNavigate(ScreenNames.Profile, { userId: '123' })}
          buttonStyle={styles.button}
        /> */}

        {/* <Button
          buttonText={UIStrings.GO_TO_TYPO_SCREEN}
          onPress={() =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            safeNavigate('TypoScreenName' as any)
          }
          buttonStyle={styles.button}
        /> */}

        {/* <Button 
          buttonText={UIStrings.TOGGLE_THEME} 
          onPress={toggleTheme}
          buttonStyle={styles.button}
        /> */}

        <Button
          buttonText="Join Meeting"
          onPress={() => safeNavigate(ScreenNames.Meeting)}
          buttonStyle={[styles.button, { backgroundColor: 'blue' }]}
        />

        <Button
          buttonText={UIStrings.LOGOUT}
          onPress={handleLogout}
          buttonStyle={[styles.button, { backgroundColor: 'red' }]}
        />
      </View>
    </View>
  );
};

export default HomeScreen;