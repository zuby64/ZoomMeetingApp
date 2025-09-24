import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeScreen, ProfileScreen, NotFoundScreen, MeetingScreen } from '../screens/index';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList, ScreenNames } from './types'; // Adjust the import path as necessary
import { ThemeProvider } from '../hooks/useAppTheme'; // Adjust the import path as necessary
import { useBootApplication } from '../hooks/useBootApplication';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components';
import { UIStrings } from '../constant';
import linking from './linking';

const Stack = createNativeStackNavigator<RootStackParamList>(); // <--- here

const AppNavigator = () => {
  const { isInitialized } = useBootApplication();
  const { userToken, isLoading } = useAuth();

  if (!isInitialized || isLoading) {
    return <Loading text={isLoading ? UIStrings.AUTHENTICATING : UIStrings.INITIALIZING} />;
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
              <Stack.Screen name={ScreenNames.Meeting} component={MeetingScreen} />
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
