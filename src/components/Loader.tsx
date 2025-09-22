import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type LoadingProps = {
  size?: 'small' | 'large' | number;
  text?: string;
};

export const Loader = ({ size, text = 'Loading...' }: LoadingProps) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator color={theme.colors.primary} size={size ?? 'large'} />
      <Text style={[styles.text, { color: theme.colors.text }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});
