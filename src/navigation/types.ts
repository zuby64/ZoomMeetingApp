import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum ScreenNames {
  Home = 'Home',
  Profile = 'Profile',
  Settings = 'Settings',
  Login = 'Login',
  Register = 'Register',
  NotFound = 'NotFound',
  Meeting = 'Meeting',

  // Add other screen names here
}
// src/navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
  Login: undefined;
  NotFound: undefined;
  Meeting: undefined;
};

// If you have Auth stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
export type HomeProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Home
>;

export type AppStackParamList = RootStackParamList & AuthStackParamList;

export const validScreens: (keyof RootStackParamList)[] = [
  ScreenNames.Home,
  ScreenNames.Profile,
  ScreenNames.Settings,
  ScreenNames.Login,
  ScreenNames.NotFound,
  ScreenNames.Meeting,
];
