// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';
// import { HomeScreen, ProfileScreen } from '@screens/index'; // Adjust the import path as necessary
// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeScreen, ProfileScreen, NotFoundScreen } from '@screens/index';
import { RootStackParamList, ScreenNames } from '@navigation/types'; // Adjust the import path as necessary
import { ThemeProvider } from '@hooks/useAppTheme'; // Adjust the import path as necessary
import { useBootApplication } from '@hooks/useBootApplication';
import { Loader } from '@components/Loader';
import linking from './linking';
const Stack = createNativeStackNavigator<RootStackParamList>(); // <--- here

const AppNavigator = () => {
  const { isInitialized } = useBootApplication();
  if (!isInitialized) {
    return <Loader />;
  }
  return (
    <ThemeProvider defaultTheme="system">
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName={ScreenNames.Home}>
          <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
          <Stack.Screen name={ScreenNames.Profile} component={ProfileScreen} />
          <Stack.Screen
            name={ScreenNames.NotFound}
            component={NotFoundScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
