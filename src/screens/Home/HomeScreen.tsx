import React from 'react';
import { View, Text, Button } from 'react-native';
import { ScreenNames } from '@navigation/types';
import { useSafeNavigation } from '@hooks/useSafeNavigation'; // ✅ your new hook
import { useAppTheme } from '@hooks/useAppTheme';

const HomeScreen = () => {
  const { safeNavigate } = useSafeNavigation(); // ✅ use this instead of useTypedNavigation
  const { theme, toggleTheme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>

      {/* ✅ Example of normal navigation */}
      <Button
        title="Go to Profile"
        onPress={() => safeNavigate(ScreenNames.Profile, { userId: '123' })}
      />

      {/* ✅ Example of a typo / fallback test */}
      <Button
        title="Go to Typo Screen"
        onPress={() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          safeNavigate('TypoScreenName' as any)
        }
      />

      {/* ✅ Toggle Theme */}
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default HomeScreen;
