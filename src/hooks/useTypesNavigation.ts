// src/hooks/useTypedNavigation.ts
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/types';
export const useTypedNavigation = () => {
  return useNavigation<NativeStackNavigationProp<AppStackParamList>>();
};
