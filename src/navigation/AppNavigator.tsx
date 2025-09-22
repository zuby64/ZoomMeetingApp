import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeScreen, ProfileScreen, NotFoundScreen } from '@screens/index';
import LoginScreen from '@screens/LoginScreen';
import { RootStackParamList, ScreenNames } from '@navigation/types'; // Adjust the import path as necessary
import { ThemeProvider } from '@hooks/useAppTheme'; // Adjust the import path as necessary
import { useBootApplication } from '@hooks/useBootApplication';
import { useAuth } from '@context/AuthContext';
import { Loader } from '@components/Loader';
import linking from './linking';

const Stack = createNativeStackNavigator<RootStackParamList>(); // <--- here

const AppNavigator = () => {
  const { isInitialized } = useBootApplication();
  const { userToken, isLoading } = useAuth();

  if (!isInitialized || isLoading) {
    return <Loader text={isLoading ? 'Authenticating...' : 'Initializing...'} />;
  }

  return (
    <ThemeProvider defaultTheme="system">
      <NavigationContainer linking={linking}>
        <Stack.Navigator 
          initialRouteName={userToken ? ScreenNames.Home : ScreenNames.Login}
          screenOptions={{ headerShown: false }}
        >
          {userToken ? (
            // Authenticated screens
            <>
              <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
              <Stack.Screen name={ScreenNames.Profile} component={ProfileScreen} />
              <Stack.Screen
                name={ScreenNames.NotFound}
                component={NotFoundScreen}
              />
            </>
          ) : (
            // Unauthenticated screens
            <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
